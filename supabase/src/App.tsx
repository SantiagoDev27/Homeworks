import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthView } from './components/AuthView';
import { TareasView } from './components/TareasView';
import { PerfilView } from './components/PerfilView';
import { ProtectedRoute } from './components/ProtectedRoute';
import type { ActiveRoute } from './types';
import './App.css';

function MainLayout() {
  const { session, loading } = useAuth();
  const [route, setRoute] = useState<ActiveRoute>('tareas');

  // Sincronización con el hash de la URL (#tareas, #perfil, #login, #register)
  useEffect(() => {
    const parseHash = (): ActiveRoute => {
      const hash = window.location.hash.replace('#', '') as ActiveRoute;
      if (['tareas', 'perfil', 'login', 'register'].includes(hash)) {
        return hash;
      }
      return session ? 'tareas' : 'login';
    };

    const handleHashChange = () => {
      setRoute(parseHash());
    };

    // Configuración inicial
    setRoute(parseHash());

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [session]);

  const changeRoute = (newRoute: ActiveRoute) => {
    setRoute(newRoute);
    window.location.hash = newRoute;
  };

  // Manejo de redirección si ya está autenticado y se encuentra en login/register
  useEffect(() => {
    if (!loading && session && (route === 'login' || route === 'register')) {
      changeRoute('tareas');
    }
  }, [session, loading, route]);

  return (
    <div className="app-layout">
      <Navbar currentRoute={route} onRouteChange={changeRoute} />

      <main className="main-content">
        {route === 'login' && (
          <AuthView
            initialMode="login"
            onSuccess={() => changeRoute('tareas')}
          />
        )}

        {route === 'register' && (
          <AuthView
            initialMode="register"
            onSuccess={() => changeRoute('tareas')}
          />
        )}

        {route === 'tareas' && (
          <ProtectedRoute onAuthSuccess={() => changeRoute('tareas')}>
            <TareasView />
          </ProtectedRoute>
        )}

        {route === 'perfil' && (
          <ProtectedRoute onAuthSuccess={() => changeRoute('perfil')}>
            <PerfilView />
          </ProtectedRoute>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Supabase Test App &bull; Auth &bull; Storage &bull; Database &bull;
          Rutas Protegidas
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
