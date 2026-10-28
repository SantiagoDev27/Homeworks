import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onSuccess: () => void;
  protectedMessage?: string | null;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  onSuccess,
  protectedMessage,
}) => {
  const { signIn, signUp } = useAuth();
  const [mode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          onSuccess();
        }
      } else {
        const { error, needsConfirmation } = await signUp(email.trim(), password);
        if (error) {
          setErrorMsg(error.message);
        } else if (needsConfirmation) {
          setSuccessMsg(
            'Cuenta creada. Si la confirmación por correo está habilitada en tu proyecto de Supabase, verifica tu bandeja de entrada antes de iniciar sesión.'
          );
        } else {
          setSuccessMsg('Cuenta creada exitosamente. Redirigiendo...');
          setTimeout(() => {
            onSuccess();
          }, 800);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {protectedMessage && (
        <div className="alert alert-warning">
          <div>
            <strong>Acceso restringido</strong>
            <p>{protectedMessage}</p>
          </div>
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Registro de Usuario'}</h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Ingresa tus credenciales para acceder a tus tareas.'
              : 'Completa los datos para registrarte en el sistema.'}
          </p>
        </div>

        {/* Feedback Messages */}
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

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="auth-email">Correo Electrónico</label>
            <input
              id="auth-email"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Contraseña</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner"></span>
            ) : mode === 'login' ? (
              'Entrar'
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="auth-footer-help">
          <small>
            Autenticación conectada a Supabase
          </small>
        </div>
      </div>
    </div>
  );
};
