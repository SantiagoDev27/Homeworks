import { supabase } from '../lib/supabase';

export interface UploadAvatarResult {
  url?: string;
  error?: string;
}

export const uploadAvatar = async (file: File, userId: string): Promise<UploadAvatarResult> => {
  try {
    const fileExt = file.name.split('.').pop() || 'png';
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

    // 1. Subir la imagen al bucket 'avatars'
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (uploadError) {
      // Si el bucket no existe o falla por permisos RLS
      if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('not found')) {
        return {
          error: "El bucket 'avatars' no existe en tu proyecto de Supabase. Créalo en Supabase Dashboard > Storage > 'New bucket' con nombre 'avatars' y márcalo como 'Public bucket'.",
        };
      }
      return { error: `Error de subida: ${uploadError.message}` };
    }

    // 2. Obtener la URL pública directa
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

    if (!data?.publicUrl) {
      return { error: 'No se pudo generar la URL pública de la imagen.' };
    }

    // 3. Guardar la URL en los metadatos del usuario autenticado
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: data.publicUrl },
    });

    if (updateError) {
      return {
        url: data.publicUrl,
        error: `Imagen subida pero falló la actualización del perfil: ${updateError.message}`,
      };
    }

    return { url: data.publicUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido al subir avatar';
    return { error: message };
  }
};
