import { ref, set, get, onValue } from 'firebase/database';
import { rtdb } from './config';
import { NaryTree } from '../models/NaryTree';
import { NaryTreeNode } from '../models/NaryTreeNode';
import type { INaryTreeNodeJSON } from '../types/tree.types';

const LOCAL_STORAGE_PREFIX = 'arbol_nario_rtdb_cache_';
const MOCK_STORAGE_KEY = 'arbol_nario_mock_tree';

export interface StorageResult {
  success: boolean;
  source: 'rtdb' | 'local';
  timestamp?: string;
  error?: string;
}

export const treeStorageService = {
  async saveUserTree(
    userId: string,
    userEmail: string,
    tree: NaryTree,
    isMock: boolean = false
  ): Promise<StorageResult> {
    const treeJSON: INaryTreeNodeJSON = tree.toJSON();
    const nowIso = new Date().toISOString();

    if (isMock) {
      try {
        localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(treeJSON));
        return { success: true, source: 'local', timestamp: nowIso };
      } catch (e) {
        return { success: false, source: 'local', error: String(e) };
      }
    }

    try {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${userId}`, JSON.stringify(treeJSON));
    } catch {}

    try {
      const userTreeRef = ref(rtdb, `users/${userId}/tree`);
      const userMetaRef = ref(rtdb, `users/${userId}/meta`);

      await set(userTreeRef, treeJSON);
      await set(userMetaRef, {
        email: userEmail,
        updatedAt: nowIso,
      });

      return {
        success: true,
        source: 'rtdb',
        timestamp: nowIso,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error al guardar en Realtime Database';
      console.warn('Realtime Database no disponible, usando respaldo local:', errMsg);

      return {
        success: true,
        source: 'local',
        timestamp: nowIso,
        error: errMsg,
      };
    }
  },

  async loadUserTree(
    userId: string,
    userEmail: string,
    isMock: boolean = false
  ): Promise<{ tree: NaryTree; source: 'rtdb' | 'local'; isNew: boolean }> {
    if (isMock) {
      try {
        const stored = localStorage.getItem(MOCK_STORAGE_KEY);
        if (stored) {
          return {
            tree: NaryTree.fromJSON(JSON.parse(stored)),
            source: 'local',
            isNew: false,
          };
        }
      } catch {}
      const mockTree = NaryTree.createDefaultTree(userEmail);
      return { tree: mockTree, source: 'local', isNew: true };
    }

    try {
      const userTreeRef = ref(rtdb, `users/${userId}/tree`);
      const snapshot = await get(userTreeRef);

      if (snapshot.exists()) {
        const data = snapshot.val() as INaryTreeNodeJSON;
        const loadedTree = NaryTree.fromJSON(data);

        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${userId}`, JSON.stringify(data));

        return {
          tree: loadedTree,
          source: 'rtdb',
          isNew: false,
        };
      }
    } catch (err) {
      console.warn('Error al leer de Realtime Database, revisando caché local:', err);
    }

    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${userId}`);
      if (cached) {
        return {
          tree: NaryTree.fromJSON(JSON.parse(cached)),
          source: 'local',
          isNew: false,
        };
      }
    } catch {}

    const cleanUserTree = new NaryTree(
      new NaryTreeNode('Mi Unidad', 'folder', userEmail, { id: 'root', parentId: null })
    );

    try {
      const userTreeRef = ref(rtdb, `users/${userId}/tree`);
      const userMetaRef = ref(rtdb, `users/${userId}/meta`);
      await set(userTreeRef, cleanUserTree.toJSON());
      await set(userMetaRef, { email: userEmail, createdAt: new Date().toISOString() });
    } catch {}

    return {
      tree: cleanUserTree,
      source: 'rtdb',
      isNew: true,
    };
  },

  subscribeToUserTree(
    userId: string,
    isMock: boolean,
    onUpdate: (tree: NaryTree) => void
  ): () => void {
    if (isMock || !userId) {
      return () => {};
    }

    try {
      const userTreeRef = ref(rtdb, `users/${userId}/tree`);
      const unsubscribe = onValue(
        userTreeRef,
        (snapshot) => {
          if (snapshot.exists()) {
            try {
              const data = snapshot.val() as INaryTreeNodeJSON;
              const tree = NaryTree.fromJSON(data);
              onUpdate(tree);
            } catch (err) {
              console.warn('Error parseando árbol de RTDB:', err);
            }
          }
        },
        (error) => {
          console.warn('Listener de Realtime Database inactivo:', error.message);
        }
      );

      return () => unsubscribe();
    } catch {
      return () => {};
    }
  },
};
