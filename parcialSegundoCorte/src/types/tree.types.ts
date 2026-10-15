export type NodeType = 'folder' | 'file';

export interface INaryTreeNodeJSON {
  id: string;
  name: string;
  type: NodeType;
  content?: string;
  size: number;
  extension?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  children: INaryTreeNodeJSON[];
}

export interface NodeCreationParams {
  name: string;
  type: NodeType;
  content?: string;
  extension?: string;
  createdBy: string;
}

export interface TreeStats {
  totalFolders: number;
  totalFiles: number;
  totalNodes: number;
  totalSizeBytes: number;
  maxDepth: number;
}
