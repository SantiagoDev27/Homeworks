import { supabase } from '../lib/supabase';
import type { Tarea } from '../types';

export const getTareas = async (): Promise<{ data: Tarea[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data as Tarea[]) || [], error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al consultar tareas';
    return { data: null, error: message };
  }
};

export const createTarea = async (
  titulo: string,
  userId: string
): Promise<{ data: Tarea | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('tareas')
      .insert([
        {
          titulo,
          completada: false,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as Tarea, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al crear la tarea';
    return { data: null, error: message };
  }
};

export const toggleTareaCompletada = async (
  id: number,
  completada: boolean
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('tareas')
      .update({ completada })
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al actualizar tarea';
    return { error: message };
  }
};

export const deleteTarea = async (id: number): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('tareas')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al eliminar la tarea';
    return { error: message };
  }
};
