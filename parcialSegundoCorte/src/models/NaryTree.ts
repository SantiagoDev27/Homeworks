import { NaryTreeNode } from './NaryTreeNode';
import type { INaryTreeNodeJSON, TreeStats } from '../types/tree.types';

export class NaryTree {
  public root: NaryTreeNode;

  constructor(root?: NaryTreeNode) {
    if (root) {
      this.root = root;
    } else {
      this.root = new NaryTreeNode('Mi Unidad', 'folder', 'sistema@universidad.edu', {
        id: 'root',
        parentId: null,
      });
    }
  }

  public find(id: string, current: NaryTreeNode = this.root): NaryTreeNode | null {
    if (current.id === id) {
      return current;
    }

    if (current.type === 'folder') {
      for (const child of current.children) {
        const found = this.find(id, child);
        if (found) return found;
      }
    }

    return null;
  }

  public findParent(id: string, current: NaryTreeNode = this.root): NaryTreeNode | null {
    if (id === this.root.id) return null;

    if (current.type === 'folder') {
      for (const child of current.children) {
        if (child.id === id) {
          return current;
        }
        const parent = this.findParent(id, child);
        if (parent) return parent;
      }
    }

    return null;
  }

  public insert(parentId: string, node: NaryTreeNode): void {
    if (!node.createdBy || !node.createdBy.includes('@')) {
      throw new Error('Dato validador requerido: Debe proporcionar un correo de creador válido para registrar el nodo.');
    }

    const parent = this.find(parentId);
    if (!parent) {
      throw new Error(`El directorio padre con ID "${parentId}" no fue encontrado en el árbol.`);
    }

    if (parent.type !== 'folder') {
      throw new Error(`Restricción estructural: No se puede agregar "${node.name}" dentro de "${parent.name}" porque es un ARCHIVO. Solo las carpetas pueden tener hijos.`);
    }

    parent.addChild(node);
    this.recalculateAllSizes();
  }

  public delete(id: string): boolean {
    if (id === this.root.id) {
      throw new Error('No está permitido eliminar el directorio raíz del sistema.');
    }

    const parent = this.findParent(id);
    if (!parent) return false;

    const removed = parent.removeChild(id);
    if (removed) {
      this.recalculateAllSizes();
    }
    return removed;
  }

  public rename(id: string, newName: string): void {
    if (id === this.root.id) {
      this.root.rename(newName);
      return;
    }

    const parent = this.findParent(id);
    if (parent) {
      const duplicate = parent.children.find(
        (c) => c.id !== id && c.name.toLowerCase() === newName.trim().toLowerCase()
      );
      if (duplicate) {
        throw new Error(`Ya existe un elemento llamado "${newName}" en este directorio.`);
      }
    }

    const node = this.find(id);
    if (!node) throw new Error('Nodo no encontrado.');
    node.rename(newName);
  }

  public updateFileContent(fileId: string, content: string): void {
    const node = this.find(fileId);
    if (!node) throw new Error('Archivo no encontrado.');
    if (node.type !== 'file') throw new Error('El nodo especificado no es un archivo.');

    node.updateContent(content);
    this.recalculateAllSizes();
  }

  public move(nodeId: string, targetFolderId: string): void {
    if (nodeId === this.root.id) {
      throw new Error('No se puede mover el nodo raíz.');
    }

    const node = this.find(nodeId);
    if (!node) throw new Error('Nodo a mover no encontrado.');

    const targetFolder = this.find(targetFolderId);
    if (!targetFolder) throw new Error('Carpeta destino no encontrada.');
    if (targetFolder.type !== 'folder') {
      throw new Error('El destino debe ser una carpeta, los archivos no pueden contener elementos.');
    }

    if (node.type === 'folder' && this.isDescendant(targetFolderId, node)) {
      throw new Error('No se puede mover una carpeta dentro de sí misma o de una de sus subcarpetas.');
    }

    const oldParent = this.findParent(nodeId);
    if (!oldParent) throw new Error('No se pudo encontrar el padre actual.');

    oldParent.removeChild(nodeId);
    targetFolder.addChild(node);
    this.recalculateAllSizes();
  }

  private isDescendant(targetNodeId: string, ancestor: NaryTreeNode): boolean {
    if (ancestor.id === targetNodeId) return true;
    for (const child of ancestor.children) {
      if (child.id === targetNodeId || this.isDescendant(targetNodeId, child)) {
        return true;
      }
    }
    return false;
  }

  public getPath(id: string): NaryTreeNode[] {
    const path: NaryTreeNode[] = [];
    let current: NaryTreeNode | null = this.find(id);

    while (current) {
      path.unshift(current);
      if (current.id === this.root.id) break;
      current = this.findParent(current.id);
    }

    return path;
  }

  public traversePreOrder(callback?: (node: NaryTreeNode, depth: number) => void): { node: NaryTreeNode; depth: number }[] {
    const result: { node: NaryTreeNode; depth: number }[] = [];

    const traverse = (node: NaryTreeNode, depth: number) => {
      result.push({ node, depth });
      if (callback) callback(node, depth);

      if (node.type === 'folder') {
        for (const child of node.children) {
          traverse(child, depth + 1);
        }
      }
    };

    traverse(this.root, 0);
    return result;
  }

  public traverseBFS(callback?: (node: NaryTreeNode, level: number) => void): { node: NaryTreeNode; level: number }[] {
    const result: { node: NaryTreeNode; level: number }[] = [];
    const queue: { node: NaryTreeNode; level: number }[] = [{ node: this.root, level: 0 }];

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      if (callback) callback(current.node, current.level);

      if (current.node.type === 'folder') {
        for (const child of current.node.children) {
          queue.push({ node: child, level: current.level + 1 });
        }
      }
    }

    return result;
  }

  public search(query: string): NaryTreeNode[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: NaryTreeNode[] = [];
    this.traversePreOrder((node) => {
      if (node.id === this.root.id) return;
      if (
        node.name.toLowerCase().includes(q) ||
        node.createdBy.toLowerCase().includes(q) ||
        (node.type === 'file' && node.content.toLowerCase().includes(q))
      ) {
        results.push(node);
      }
    });

    return results;
  }

  public getStats(): TreeStats {
    let totalFolders = 0;
    let totalFiles = 0;
    let maxDepth = 0;

    this.traversePreOrder((node, depth) => {
      if (depth > maxDepth) maxDepth = depth;
      if (node.type === 'folder') {
        totalFolders++;
      } else {
        totalFiles++;
      }
    });

    return {
      totalFolders,
      totalFiles,
      totalNodes: totalFolders + totalFiles,
      totalSizeBytes: this.root.size,
      maxDepth,
    };
  }

  public recalculateAllSizes(): void {
    this.root.calculateSize();
  }

  public toJSON(): INaryTreeNodeJSON {
    return this.root.toJSON();
  }

  public static fromJSON(json: INaryTreeNodeJSON): NaryTree {
    const rootNode = NaryTreeNode.fromJSON(json);
    return new NaryTree(rootNode);
  }

  public clone(): NaryTree {
    return NaryTree.fromJSON(this.toJSON());
  }

  public static createDefaultTree(creatorEmail: string = 'admin@parcial.edu'): NaryTree {
    const tree = new NaryTree(
      new NaryTreeNode('Mi Unidad', 'folder', creatorEmail, { id: 'root', parentId: null })
    );

    const docs = new NaryTreeNode('Documentos', 'folder', creatorEmail);
    const projects = new NaryTreeNode('Proyectos Web', 'folder', creatorEmail);
    const media = new NaryTreeNode('Recursos Gráficos', 'folder', creatorEmail);

    tree.insert('root', docs);
    tree.insert('root', projects);
    tree.insert('root', media);

    const welcomeFile = new NaryTreeNode(
      'leeme.txt',
      'file',
      creatorEmail,
      {
        content: 'Bienvenido al Sistema de Gestión de Archivos y Carpetas.\nImplementado con un Árbol N-ario desde cero.\nCada archivo y carpeta almacena el correo de su autor.',
        extension: 'txt',
      }
    );
    tree.insert('root', welcomeFile);

    const homeworkFile = new NaryTreeNode(
      'enunciado_parcial.md',
      'file',
      creatorEmail,
      {
        content: '# Parcial Segundo Corte\n- Árbol n-ario desde cero\n- Login con Firebase\n- Persistencia en Base de Datos\n- Validación de creador por correo\n- Regla: Archivos no tienen hijos, carpetas sí.',
        extension: 'md',
      }
    );
    tree.insert(docs.id, homeworkFile);

    const codeFile = new NaryTreeNode(
      'main.ts',
      'file',
      creatorEmail,
      {
        content: 'console.log("Árbol N-ario inicializado con éxito");',
        extension: 'ts',
      }
    );
    tree.insert(projects.id, codeFile);

    return tree;
  }
}
