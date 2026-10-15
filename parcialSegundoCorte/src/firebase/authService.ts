import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './config';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isMock?: boolean;
}

const MOCK_STORAGE_KEY = 'arbol_nario_mock_user';

export const authService = {
  async loginWithEmail(email: string, pass: string): Promise<AppUser> {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    localStorage.removeItem(MOCK_STORAGE_KEY);
    return {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: cred.user.displayName || email.split('@')[0],
      photoURL: cred.user.photoURL || undefined,
      isMock: false,
    };
  },

  async registerWithEmail(email: string, pass: string): Promise<AppUser> {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    localStorage.removeItem(MOCK_STORAGE_KEY);
    return {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: cred.user.displayName || email.split('@')[0],
      photoURL: cred.user.photoURL || undefined,
      isMock: false,
    };
  },

  async loginWithGoogle(): Promise<AppUser> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    localStorage.removeItem(MOCK_STORAGE_KEY);
    return {
      uid: cred.user.uid,
      email: cred.user.email || 'usuario@google.com',
      displayName: cred.user.displayName || 'Usuario Google',
      photoURL: cred.user.photoURL || undefined,
      isMock: false,
    };
  },

  loginMock(email: string, name?: string): AppUser {
    const mockUser: AppUser = {
      uid: 'mock_' + Math.random().toString(36).substring(2, 9),
      email: email.trim(),
      displayName: name || email.split('@')[0],
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      isMock: true,
    };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  getStoredMockUser(): AppUser | null {
    try {
      const data = localStorage.getItem(MOCK_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem(MOCK_STORAGE_KEY);
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Error al cerrar sesión de Firebase:', e);
    }
  },

  subscribeToAuth(callback: (user: AppUser | null) => void): () => void {
    const unsubscribeFirebase = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      const storedMock = this.getStoredMockUser();
      if (storedMock) {
        callback(storedMock);
      } else if (fbUser) {
        callback({
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Usuario',
          photoURL: fbUser.photoURL || undefined,
          isMock: false,
        });
      } else {
        callback(null);
      }
    });

    return unsubscribeFirebase;
  },
};
