import React, { useState, useEffect } from 'react';
import { NaryTree } from './models/NaryTree';
import { NaryTreeNode } from './models/NaryTreeNode';
import { treeStorageService } from './firebase/treeStorageService';
import { useAuth } from './context/AuthContext';
import {
  Folder,
  FolderOpen,
  FileText,
  FolderPlus,
  FilePlus,
  Trash2,
  LogOut,
  Search,
  CheckCircle,
  X,
  Lock,
  Mail,
  User,
  AlertCircle,
} from 'lucide-react';

export const App: React.FC = () => {
  const { user, loginWithEmail, registerWithEmail, loginMock, logout } = useAuth();

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [tree, setTree] = useState<NaryTree>(() => NaryTree.createDefaultTree());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [creationType, setCreationType] = useState<'folder' | 'file' | null>(null);
  const [itemName, setItemName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [creationError, setCreationError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    setSelectedNodeId(null);

    const load = async () => {
      try {
        const result = await treeStorageService.loadUserTree(
          user.uid,
          user.email,
          Boolean(user.isMock)
        );
        if (isMounted) {
          setTree(result.tree);
        }
      } catch (e) {
        console.warn('Error al cargar árbol del usuario:', e);
      }
    };

    load();

    const unsubscribe = treeStorageService.subscribeToUserTree(
      user.uid,
      Boolean(user.isMock),
      (remoteTree) => {
        if (isMounted) {
          setTree(remoteTree);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user?.uid, user?.isMock]);

  const persistChanges = async (newTree: NaryTree) => {
    setTree(newTree);
    if (user) {
      await treeStorageService.saveUserTree(
        user.uid,
        user.email,
        newTree,
        Boolean(user.isMock)
      );
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (isRegistering) {
        await registerWithEmail(authEmail, authPassword);
      } else {
        await loginWithEmail(authEmail, authPassword);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de autenticación';
      if (msg.includes('invalid-credential') || msg.includes('wrong-password')) {
        setAuthError('Correo o contraseña incorrectos.');
      } else if (msg.includes('email-already-in-use')) {
        setAuthError('El correo ya está registrado.');
      } else if (msg.includes('weak-password')) {
        setAuthError('La contraseña debe tener mínimo 6 caracteres.');
      } else {
        setAuthError(msg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleQuickMockLogin = () => {
    loginMock('estudiante@universidad.edu.co', 'Estudiante Parcial');
  };

  const selectedNode = selectedNodeId ? tree.find(selectedNodeId) : null;
  const isSelectedFolder = selectedNode ? selectedNode.type === 'folder' : true;

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    setCreationError(null);

    if (!user || !user.email) {
      setCreationError('Debes estar autenticado para crear elementos.');
      return;
    }

    const trimmed = itemName.trim();
    if (!trimmed) {
      setCreationError('El nombre no puede estar vacío.');
      return;
    }

    let targetParentId = 'root';
    if (selectedNode) {
      if (selectedNode.type === 'folder') {
        targetParentId = selectedNode.id;
      } else {
        setCreationError('Un archivo no puede tener hijos. Selecciona una carpeta.');
        return;
      }
    }

    try {
      const cloned = tree.clone();
      const newNode = new NaryTreeNode(
        trimmed,
        creationType === 'folder' ? 'folder' : 'file',
        user.email,
        {
          content: creationType === 'file' ? fileContent : '',
          parentId: targetParentId,
        }
      );

      cloned.insert(targetParentId, newNode);

      persistChanges(cloned);
      setItemName('');
      setFileContent('');
      setCreationType(null);
      setSelectedNodeId(newNode.id);
    } catch (err: unknown) {
      setCreationError(err instanceof Error ? err.message : 'Error al crear elemento');
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedNode) return;
    if (selectedNode.id === tree.root.id) {
      alert('No se puede eliminar la carpeta raíz.');
      return;
    }

    const confirmText = selectedNode.type === 'folder'
      ? `¿Eliminar carpeta "${selectedNode.name}" y todo su contenido?`
      : `¿Eliminar archivo "${selectedNode.name}"?`;

    if (window.confirm(confirmText)) {
      try {
        const cloned = tree.clone();
        cloned.delete(selectedNode.id);
        persistChanges(cloned);
        setSelectedNodeId(null);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'No se pudo eliminar');
      }
    }
  };

  if (!user) {
    return (
      <div className="simple-login-container">
        <div className="simple-login-card">
          <div className="login-header">
            <div className="login-icon">
              <Folder size={32} />
            </div>
            <h2>Sistema de Archivos N-ario</h2>
            <p className="login-subtitle">
              Inicia sesión para crear carpetas, archivos y registrar autoría
            </p>
          </div>

          {authError && <div className="simple-alert danger">{authError}</div>}

          <form onSubmit={handleAuthSubmit} className="simple-form">
            <div className="form-field">
              <label htmlFor="login-email">Correo Electrónico (Validador)</label>
              <div className="input-box">
                <Mail size={16} />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="ejemplo@universidad.edu.co"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="login-password">Contraseña</label>
              <div className="input-box">
                <Lock size={16} />
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={authLoading}>
              {authLoading
                ? 'Verificando...'
                : isRegistering
                  ? 'Registrarse en Firebase'
                  : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-switch">
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setAuthError(null);
              }}
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate aquí'}
            </button>
          </div>

          <div className="login-divider">
            <span>o para probar rápido</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={handleQuickMockLogin}
          >
            <User size={16} /> Acceso Rápido (Modo Demo / Mock)
          </button>
        </div>
      </div>
    );
  }

  const searchResults = searchQuery.trim() ? tree.search(searchQuery) : null;

  return (
    <div className="simple-app">
      <header className="simple-navbar">
        <div className="nav-brand">
          <Folder size={22} className="brand-logo" />
          <span className="brand-name">Árbol N-ario</span>
          <span className="brand-tag">Estructura de Datos</span>
        </div>

        <div className="nav-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o correo creador..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="nav-user">
          <span className="user-email-badge" title="Correo Validador">
            👤 {user.email}
          </span>
          <button className="btn btn-logout" onClick={logout} title="Cerrar sesión">
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </div>
      </header>

      <section className="simple-toolbar">
        <div className="selection-status">
          <span className="status-label">Ubicación seleccionada:</span>
          {selectedNode ? (
            <span className={`selected-pill ${selectedNode.type}`}>
              {selectedNode.type === 'folder' ? <Folder size={14} /> : <FileText size={14} />}
              <strong>{selectedNode.name}</strong>
              <small>({selectedNode.type === 'folder' ? 'Carpeta' : 'Archivo'})</small>
            </span>
          ) : (
            <span className="selected-pill folder">
              <Folder size={14} />
              <strong>{tree.root.name}</strong>
              <small>(Raíz)</small>
            </span>
          )}

          {selectedNode && (
            <button
              className="btn-link"
              onClick={() => setSelectedNodeId(null)}
              title="Volver a seleccionar la raíz"
            >
              (Deseleccionar)
            </button>
          )}
        </div>

        <div className="toolbar-actions">
          {isSelectedFolder ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCreationType('folder');
                  setItemName('');
                  setCreationError(null);
                }}
              >
                <FolderPlus size={16} />
                <span>+ Crear {selectedNode ? 'Subcarpeta' : 'Carpeta'}</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setCreationType('file');
                  setItemName('');
                  setFileContent('');
                  setCreationError(null);
                }}
              >
                <FilePlus size={16} />
                <span>+ Crear Archivo</span>
              </button>
            </>
          ) : (
            <div className="file-warning-msg">
              <AlertCircle size={15} />
              <span>Un archivo no puede tener hijos. Selecciona una carpeta para agregar elementos.</span>
            </div>
          )}

          {selectedNode && selectedNode.id !== tree.root.id && (
            <button
              className="btn btn-danger"
              onClick={handleDeleteSelected}
              title="Eliminar elemento seleccionado"
            >
              <Trash2 size={16} />
              <span>Eliminar</span>
            </button>
          )}
        </div>
      </section>

      {creationType && (
        <div className="creation-modal-backdrop" onClick={() => setCreationType(null)}>
          <div className="creation-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="creation-header">
              <h3>
                {creationType === 'folder' ? '📁 Nueva Carpeta' : '📄 Nuevo Archivo'}
              </h3>
              <button className="close-btn" onClick={() => setCreationType(null)}>
                <X size={18} />
              </button>
            </div>

            <p className="creation-dest-hint">
              Se creará dentro de: <strong>{selectedNode ? selectedNode.name : tree.root.name}</strong>
            </p>

            {creationError && <div className="simple-alert danger">{creationError}</div>}

            <form onSubmit={handleCreateItem}>
              <div className="form-field">
                <label>Nombre del {creationType === 'folder' ? 'directorio' : 'archivo'}:</label>
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder={creationType === 'folder' ? 'Ej. Documentos' : 'Ej. notas.txt'}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              {creationType === 'file' && (
                <div className="form-field">
                  <label>Contenido del archivo (opcional):</label>
                  <textarea
                    rows={4}
                    placeholder="Escribe el contenido o texto del archivo..."
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                  />
                </div>
              )}

              <div className="creator-val-box">
                <CheckCircle size={14} className="val-icon" />
                <span>Dato Validador: <strong>{user.email}</strong></span>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCreationType(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Crear {creationType === 'folder' ? 'Carpeta' : 'Archivo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="simple-content">
        <div className="tree-visual-card">
          <div className="tree-card-header">
            <h3>Estructura del Árbol N-ario</h3>
            <span className="tree-stats-hint">
              Total elementos: {tree.getStats().totalNodes} ({tree.getStats().totalFolders} carpetas, {tree.getStats().totalFiles} archivos)
            </span>
          </div>

          <div className="tree-items-list">
            {searchResults ? (
              searchResults.length > 0 ? (
                <div className="search-results-list">
                  <p className="search-info">
                    Resultados para: <em>"{searchQuery}"</em> ({searchResults.length} encontrados)
                  </p>
                  {searchResults.map((node) => (
                    <SimpleTreeRow
                      key={node.id}
                      node={node}
                      depth={0}
                      isSelected={selectedNodeId === node.id}
                      onSelect={(n) => setSelectedNodeId(n.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-tree-msg">
                  No se encontraron carpetas o archivos que coincidan con "{searchQuery}".
                </div>
              )
            ) : (
              <SimpleTreeHierarchy
                node={tree.root}
                depth={0}
                selectedNodeId={selectedNodeId}
                onSelect={(n) => setSelectedNodeId(n.id)}
              />
            )}
          </div>
        </div>

        {selectedNode && selectedNode.type === 'file' && (
          <aside className="file-detail-panel">
            <div className="detail-header">
              <h4>📄 Detalle del Archivo</h4>
              <button className="close-btn" onClick={() => setSelectedNodeId(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="detail-body">
              <p><strong>Nombre:</strong> {selectedNode.name}</p>
              <p><strong>Creador (Validador):</strong> {selectedNode.createdBy}</p>
              <p><strong>Tamaño:</strong> {selectedNode.size} bytes</p>
              <p><strong>Fecha creación:</strong> {new Date(selectedNode.createdAt).toLocaleString('es-CO')}</p>
              <div className="detail-content-box">
                <label>Contenido del archivo:</label>
                <div className="content-preview">
                  {selectedNode.content || <em>(El archivo está vacío)</em>}
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

interface SimpleTreeHierarchyProps {
  node: NaryTreeNode;
  depth: number;
  selectedNodeId: string | null;
  onSelect: (node: NaryTreeNode) => void;
}

const SimpleTreeHierarchy: React.FC<SimpleTreeHierarchyProps> = ({
  node,
  depth,
  selectedNodeId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedNodeId === node.id;
  const isFolder = node.type === 'folder';
  const hasChildren = isFolder && node.children.length > 0;

  return (
    <div className="tree-branch">
      <div
        className={`tree-row ${isSelected ? 'is-selected' : ''} ${isFolder ? 'folder-row' : 'file-row'}`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => onSelect(node)}
      >
        {isFolder ? (
          <button
            type="button"
            className="folder-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <FolderOpen size={18} className="folder-icon" /> : <Folder size={18} className="folder-icon" />}
          </button>
        ) : (
          <FileText size={18} className="file-icon" />
        )}

        <span className="node-title">{node.name}</span>

        <span className={`node-type-badge ${node.type}`}>
          {isFolder ? 'Carpeta' : 'Archivo'}
        </span>

        <span className="node-creator-badge" title="Dato validador de autoría">
          👤 {node.createdBy}
        </span>

        {isFolder && hasChildren && (
          <span className="children-count">({node.children.length} {node.children.length === 1 ? 'hijo' : 'hijos'})</span>
        )}
      </div>

      {isFolder && isOpen && hasChildren && (
        <div className="tree-sub-branches">
          {node.children.map((child) => (
            <SimpleTreeHierarchy
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      {isFolder && isOpen && !hasChildren && node.id === 'root' && (
        <div
          style={{
            paddingLeft: '38px',
            paddingTop: '8px',
            paddingBottom: '8px',
            color: 'var(--text-dim)',
            fontSize: '0.8rem',
            fontStyle: 'italic',
          }}
        >
          📂 Tu unidad está vacía. Selecciona "Mi Unidad" y haz clic en "+ Crear Carpeta" para comenzar.
        </div>
      )}
    </div>
  );
};

const SimpleTreeRow: React.FC<{
  node: NaryTreeNode;
  depth: number;
  isSelected: boolean;
  onSelect: (node: NaryTreeNode) => void;
}> = ({ node, isSelected, onSelect }) => {
  const isFolder = node.type === 'folder';

  return (
    <div
      className={`tree-row ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(node)}
      style={{ paddingLeft: '14px' }}
    >
      {isFolder ? <Folder size={18} className="folder-icon" /> : <FileText size={18} className="file-icon" />}
      <span className="node-title">{node.name}</span>
      <span className={`node-type-badge ${node.type}`}>{isFolder ? 'Carpeta' : 'Archivo'}</span>
      <span className="node-creator-badge">👤 {node.createdBy}</span>
    </div>
  );
};

export default App;
