import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { ActiveRoute } from '../types';

interface NavbarProps {
  currentRoute: ActiveRoute;
  onRouteChange: (route: ActiveRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onRouteChange }) => {
  const { session, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onRouteChange('login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container navbar-simple">
        {!session ? (
          <div className="header-auth-buttons">
            <button
              type="button"
              className={`nav-btn ${currentRoute === 'login' ? 'active' : ''}`}
              onClick={() => onRouteChange('login')}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className={`nav-btn ${currentRoute === 'register' ? 'active' : ''}`}
              onClick={() => onRouteChange('register')}
            >
              Registrarse
            </button>
          </div>
        ) : (
          <div className="header-auth-buttons">
            <button
              type="button"
              className="nav-btn btn-logout"
              onClick={handleSignOut}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
