import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadAvatar } from '../storage/avatarService';

export const PerfilView: React.FC = () => {
  const { user, avatarUrl, updateAvatarUrl } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('La imagen no debe superar los 5MB.');
      return;
    }

    setUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = await uploadAvatar(file, user.id);

    if (result.error) {
      setErrorMsg(result.error);
    } else if (result.url) {
      await updateAvatarUrl(result.url);
      setSuccessMsg('Foto de perfil actualizada exitosamente en Supabase Storage.');
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="perfil-wrapper">
      <div className="view-header">
        <div>
          <h2>Perfil de Usuario</h2>
          <p className="view-subtitle">
            Gestión de avatar y datos de sesión en Supabase Auth y Storage
          </p>
        </div>
      </div>

      {/* Alertas */}
      {errorMsg && (
        <div className="alert alert-error">
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success">
          <span>{successMsg}</span>
        </div>
      )}

      <div className="perfil-card">
        {/* Sección de Avatar */}
        <div className="avatar-section">
          <div className="avatar-frame">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Foto de perfil" className="avatar-img-large" />
            ) : (
              <div className="avatar-placeholder-large">{userInitial}</div>
            )}
            {uploading && (
              <div className="avatar-upload-overlay">
                <span className="spinner"></span>
              </div>
            )}
          </div>

          <div className="avatar-actions">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              disabled={uploading}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Subiendo archivo...' : 'Subir foto'}
            </button>
            <small className="help-text">Formatos permitidos: JPG, PNG, WebP. Máximo 5MB.</small>
          </div>
        </div>

        {/* Datos de la cuenta */}
        <div className="perfil-details">
          <h3>Información de Cuenta</h3>
          <div className="detail-row">
            <span className="detail-label">Correo Electrónico:</span>
            <span className="detail-value">{user?.email || 'N/A'}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">User ID (auth.uid):</span>
            <span className="detail-value code-snippet">{user?.id || 'N/A'}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Fecha de Registro:</span>
            <span className="detail-value">
              {user?.created_at
                ? new Date(user.created_at).toLocaleString()
                : 'N/A'}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">URL del Avatar:</span>
            <span className="detail-value text-truncate">
              {avatarUrl ? (
                <a href={avatarUrl} target="_blank" rel="noreferrer" className="link-avatar">
                  Ver archivo en Storage
                </a>
              ) : (
                'Sin avatar configurado'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Nota informativa de Storage */}
      <div className="storage-info-box">
        <h4>Configuración de Supabase Storage</h4>
        <p>
          Las imágenes se almacenan en el bucket <strong><code>avatars</code></strong>. Si la subida falla, asegúrate de que el bucket exista y sea público en tu panel de Supabase:
        </p>
        <ol>
          <li>Entra a Supabase Dashboard &gt; <strong>Storage</strong>.</li>
          <li>Crea un bucket con nombre <code>avatars</code>.</li>
          <li>Marca la opción <strong>Public bucket</strong>.</li>
        </ol>
      </div>
    </div>
  );
};
