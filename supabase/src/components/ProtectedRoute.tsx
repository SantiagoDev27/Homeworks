import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthView } from './AuthView';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onAuthSuccess: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onAuthSuccess,
}) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading-container">
        <span className="spinner"></span>
        <p>Verificando sesión en Supabase...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <AuthView
        initialMode="login"
        onSuccess={onAuthSuccess}
        protectedMessage="Esta sección está protegida. Por favor inicia sesión o crea una cuenta para acceder a tus tareas y perfil."
      />
    );
  }

  return <>{children}</>;
};
