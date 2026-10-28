export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  user_id: string;
  created_at: string;
}

export type ActiveRoute = 'login' | 'register' | 'tareas' | 'perfil';

export interface UserMetadata {
  avatar_url?: string;
  nombre?: string;
}
