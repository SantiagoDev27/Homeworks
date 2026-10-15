import React, { createContext, useContext, useEffect, useState } from 'react';
import { type AppUser, authService } from '../firebase/authService';

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginMock: (email: string, name?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedMock = authService.getStoredMockUser();
    if (storedMock) {
      setUser(storedMock);
      setIsLoading(false);
    }

    const unsubscribe = authService.subscribeToAuth((fbUser) => {
      setUser(fbUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithEmail = async (email: string, pass: string) => {
    const loggedUser = await authService.loginWithEmail(email, pass);
    setUser(loggedUser);
    closeAuthModal();
  };

  const registerWithEmail = async (email: string, pass: string) => {
    const newUser = await authService.registerWithEmail(email, pass);
    setUser(newUser);
    closeAuthModal();
  };

  const loginWithGoogle = async () => {
    const googleUser = await authService.loginWithGoogle();
    setUser(googleUser);
    closeAuthModal();
  };

  const loginMock = (email: string, name?: string) => {
    const mockUser = authService.loginMock(email, name);
    setUser(mockUser);
    closeAuthModal();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginMock,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
