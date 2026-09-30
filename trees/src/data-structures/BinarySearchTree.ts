import { TreeNode } from './Node';

export interface D3TreeNode {
    name: string;
    children?: D3TreeNode[];
}

export class BinarySearchTree {
    root: TreeNode | null = null;

    insert(value: number): this | undefined {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    contains(value: number): boolean {
        if (!this.root) return false;
        let current: TreeNode | null = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }

    // Modificados para retornar arreglos numéricos en lugar de console.log
    preOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
        if (node) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
        return result;
    }

    inOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
        if (node) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
        return result;
    }

    postOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
        if (node) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
        return result;
    }

    toD3Format(node: TreeNode | null = this.root): D3TreeNode | null {
        if (!node) return null;

        const d3Node: D3TreeNode = {
            name: String(node.value),
            children: []
        };

        if (node.left) d3Node.children!.push(this.toD3Format(node.left) as D3TreeNode);
        if (node.right) d3Node.children!.push(this.toD3Format(node.right) as D3TreeNode);

        if (d3Node.children && d3Node.children.length === 0) {
            delete d3Node.children;
        }

        return d3Node;
    }
}