import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getTareas,
  createTarea,
  toggleTareaCompletada,
  deleteTarea,
} from '../tareas/tareasService';
import { uploadAvatar } from '../storage/avatarService';
import type { Tarea } from '../types';

export const TareasView: React.FC = () => {
  const { user, avatarUrl, updateAvatarUrl } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados de Tareas
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [filtro, setFiltro] = useState<'todas' | 'pendientes' | 'completadas'>('todas');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estados de Avatar
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const cargarTareas = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await getTareas();
    if (error) {
      setErrorMsg(error);
    } else {
      setTareas(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      setAvatarMsg({ text: 'Por favor selecciona un archivo de imagen (JPG, PNG, WebP).', isError: true });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarMsg({ text: 'La imagen no debe superar los 5MB.', isError: true });
      return;
    }

    setUploadingAvatar(true);
    setAvatarMsg(null);

    const result = await uploadAvatar(file, user.id);
    if (result.error) {
      setAvatarMsg({ text: result.error, isError: true });
    } else if (result.url) {
      await updateAvatarUrl(result.url);
      setAvatarMsg({ text: 'Foto de perfil actualizada correctamente en Storage.', isError: false });
    }

    setUploadingAvatar(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCrearTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !user) return;

    setActionLoading(true);
    const { data, error } = await createTarea(nuevoTitulo.trim(), user.id);
    if (error) {
      setErrorMsg(`Error al crear la tarea: ${error}`);
    } else if (data) {
      setTareas((prev) => [data, ...prev]);
      setNuevoTitulo('');
    }
    setActionLoading(false);
  };

  const handleToggle = async (tarea: Tarea) => {
    const nuevoEstado = !tarea.completada;
    setTareas((prev) =>
      prev.map((t) => (t.id === tarea.id ? { ...t, completada: nuevoEstado } : t))
    );

    const { error } = await toggleTareaCompletada(tarea.id, nuevoEstado);
    if (error) {
      setErrorMsg(`Error al actualizar estado: ${error}`);
      cargarTareas();
    }
  };

  const handleEliminar = async (id: number) => {
    const prevTareas = [...tareas];
    setTareas((prev) => prev.filter((t) => t.id !== id));

    const { error } = await deleteTarea(id);
    if (error) {
      setErrorMsg(`Error al eliminar tarea: ${error}`);
      setTareas(prevTareas);
    }
  };

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === 'pendientes') return !t.completada;
    if (filtro === 'completadas') return t.completada;
    return true;
  });

  const totalCompletadas = tareas.filter((t) => t.completada).length;
  const totalPendientes = tareas.length - totalCompletadas;
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="tareas-wrapper">
      {/* Barra de Perfil y Subida de Avatar */}
      <div className="user-profile-banner">
        <div className="user-profile-left">
          <div className="user-avatar-circle">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Foto de perfil" />
            ) : (
              <span>{userInitial}</span>
            )}
          </div>
          <div className="user-info-text">
            <span className="user-email-label">{user?.email}</span>
            <span className="user-uid-label">ID: {user?.id}</span>
          </div>
        </div>

        <div className="user-profile-right">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
            disabled={uploadingAvatar}
          />
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
          >
            {uploadingAvatar ? 'Subiendo...' : 'Subir foto de perfil'}
          </button>
        </div>
      </div>

      {avatarMsg && (
        <div className={`alert ${avatarMsg.isError ? 'alert-error' : 'alert-success'}`}>
          <span>{avatarMsg.text}</span>
        </div>
      )}

      {/* Header y Estadísticas de Tareas */}
      <div className="view-header">
        <div>
          <h2>Tareas</h2>
          <p className="view-subtitle">
            Tabla <code>tareas</code> de Supabase
          </p>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">{tareas.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-number">{totalPendientes}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat-card stat-completed">
            <span className="stat-number">{totalCompletadas}</span>
            <span className="stat-label">Completadas</span>
          </div>
        </div>
      </div>

      {/* Formulario de nueva tarea */}
      <form onSubmit={handleCrearTarea} className="tarea-form-card">
        <div className="input-group">
          <input
            type="text"
            className="input-nueva-tarea"
            placeholder="Título de la nueva tarea..."
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            disabled={actionLoading}
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={actionLoading || !nuevoTitulo.trim()}
          >
            {actionLoading ? 'Guardando...' : 'Agregar tarea'}
          </button>
        </div>
      </form>

      {/* Mensajes de error si falla la tabla */}
      {errorMsg && (
        <div className="alert alert-error">
          <div style={{ flex: 1 }}>
            <strong>Error:</strong> {errorMsg}
            <div className="alert-actions">
              <button
                type="button"
                className="btn-retry"
                onClick={cargarTareas}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros de tareas */}
      <div className="tareas-toolbar">
        <div className="filter-pills">
          <button
            type="button"
            className={`pill ${filtro === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltro('todas')}
          >
            Todas ({tareas.length})
          </button>
          <button
            type="button"
            className={`pill ${filtro === 'pendientes' ? 'active' : ''}`}
            onClick={() => setFiltro('pendientes')}
          >
            Pendientes ({totalPendientes})
          </button>
          <button
            type="button"
            className={`pill ${filtro === 'completadas' ? 'active' : ''}`}
            onClick={() => setFiltro('completadas')}
          >
            Completadas ({totalCompletadas})
          </button>
        </div>
        <button
          type="button"
          className="btn-reload"
          onClick={cargarTareas}
          title="Recargar tareas"
        >
          Actualizar
        </button>
      </div>

      {/* Listado de tareas */}
      <div className="tareas-list">
        {loading ? (
          <div className="loading-state">
            <span className="spinner"></span>
            <p>Cargando tareas...</p>
          </div>
        ) : tareasFiltradas.length === 0 ? (
          <div className="empty-state">
            <h3>No hay tareas registradas</h3>
            <p>
              {tareas.length === 0
                ? 'No existen tareas actualmente. Ingresa un título arriba para registrar una.'
                : `No se encontraron tareas con el filtro "${filtro}".`}
            </p>
          </div>
        ) : (
          tareasFiltradas.map((tarea) => (
            <div
              key={tarea.id}
              className={`tarea-item ${tarea.completada ? 'completed' : ''}`}
            >
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => handleToggle(tarea)}
                />
                <span className="checkmark"></span>
              </label>

              <div className="tarea-content" onClick={() => handleToggle(tarea)}>
                <span className="tarea-titulo">{tarea.titulo}</span>
                <div className="tarea-metadata">
                  <span className="badge-id">ID #{tarea.id}</span>
                  <span className="badge-date">
                    {new Date(tarea.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-delete"
                onClick={() => handleEliminar(tarea.id)}
                title="Eliminar tarea"
                aria-label="Eliminar tarea"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
