import type { NodeType, INaryTreeNodeJSON } from '../types/tree.types';

export class NaryTreeNode {
  public id: string;
  public name: string;
  public type: NodeType;
  public content: string;
  public size: number;
  public extension: string;
  public createdBy: string;
  public createdAt: string;
  public updatedAt: string;
  public parentId: string | null;
  public children: NaryTreeNode[];

  constructor(
    name: string,
    type: NodeType,
    createdBy: string,
    options?: {
      id?: string;
      content?: string;
      extension?: string;
      size?: number;
      parentId?: string | null;
      createdAt?: string;
      updatedAt?: string;
    }
  ) {
    this.id = options?.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'node_' + Math.random().toString(36).substring(2, 11));
    this.name = name.trim();
    this.type = type;
    this.createdBy = createdBy.trim();
    this.parentId = options?.parentId ?? null;
    this.createdAt = options?.createdAt || new Date().toISOString();
    this.updatedAt = options?.updatedAt || new Date().toISOString();

    if (this.type === 'file') {
      this.content = options?.content ?? '';
      this.extension = options?.extension || this.extractExtension(name);
      this.size = options?.size !== undefined ? options.size : this.computeFileSize(this.content);
      this.children = [];
    } else {
      this.content = '';
      this.extension = '';
      this.size = 0;
      this.children = [];
    }
  }

  private extractExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length > 1) {
      return parts.pop()?.toLowerCase() || '';
    }
    return 'txt';
  }

  private computeFileSize(text: string): number {
    return new Blob([text]).size;
  }

  public isFolder(): boolean {
    return this.type === 'folder';
  }

  public isFile(): boolean {
    return this.type === 'file';
  }

  public addChild(child: NaryTreeNode): void {
    if (this.type === 'file') {
      throw new Error(`Operación inválida: Un archivo ("${this.name}") no puede contener hijos. Solo las carpetas admiten sub-elementos.`);
    }

    const duplicate = this.children.find(
      (c) => c.name.toLowerCase() === child.name.toLowerCase() && c.type === child.type
    );
    if (duplicate) {
      throw new Error(`Ya existe un ${child.type === 'folder' ? 'directorio' : 'archivo'} con el nombre "${child.name}" en esta carpeta.`);
    }

    child.parentId = this.id;
    this.children.push(child);
    this.updatedAt = new Date().toISOString();
    this.calculateSize();
  }

  public removeChild(childId: string): boolean {
    if (this.type === 'file') return false;

    const initialLength = this.children.length;
    this.children = this.children.filter((c) => c.id !== childId);
    if (this.children.length !== initialLength) {
      this.updatedAt = new Date().toISOString();
      this.calculateSize();
      return true;
    }
    return false;
  }

  public updateContent(newContent: string): void {
    if (this.type !== 'file') {
      throw new Error('Solo los archivos poseen contenido de texto.');
    }
    this.content = newContent;
    this.size = this.computeFileSize(newContent);
    this.updatedAt = new Date().toISOString();
  }

  public rename(newName: string): void {
    const trimmed = newName.trim();
    if (!trimmed) throw new Error('El nombre no puede estar vacío.');
    this.name = trimmed;
    if (this.type === 'file') {
      this.extension = this.extractExtension(trimmed);
    }
    this.updatedAt = new Date().toISOString();
  }

  public calculateSize(): number {
    if (this.type === 'file') {
      return this.size;
    }
    let total = 0;
    for (const child of this.children) {
      total += child.calculateSize();
    }
    this.size = total;
    return total;
  }

  public toJSON(): INaryTreeNodeJSON {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      content: this.content,
      size: this.size,
      extension: this.extension,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      parentId: this.parentId,
      children: this.type === 'folder' ? this.children.map((c) => c.toJSON()) : [],
    };
  }

  public static fromJSON(data: INaryTreeNodeJSON): NaryTreeNode {
    const node = new NaryTreeNode(data.name, data.type, data.createdBy || 'sistema@universidad.edu', {
      id: data.id,
      content: data.content,
      extension: data.extension,
      size: data.size,
      parentId: data.parentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    if (data.type === 'folder' && Array.isArray(data.children)) {
      node.children = data.children.map((childData) => {
        const childNode = NaryTreeNode.fromJSON(childData);
        childNode.parentId = node.id;
        return childNode;
      });
      node.calculateSize();
    } else {
      node.children = [];
    }

    return node;
  }

  public clone(): NaryTreeNode {
    return NaryTreeNode.fromJSON(this.toJSON());
  }
}
