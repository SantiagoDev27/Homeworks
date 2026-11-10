import Node from "./node_use"
import MaxHeap from "./heap_class"
import type { element } from "../types/element"

class Trie {
    root: Node
    constructor() {
        this.root = new Node(null)
    }

    insert(nombre: string, popularidad: number): void {
        let current = this.root
        for (const character of nombre.toLowerCase()) {
            if (current.children[character] === undefined) {
                current.children[character] = new Node(character)
            }
            current = current.children[character]
        }
        current.isEndOfWord = true
        current.element = { nombre, popularidad }
    }

    private findNode(word: string): Node | null {
        let current = this.root
        for (const character of word.toLowerCase()) {
            const next = current.children[character]
            if (next === undefined) return null
            current = next
        }
        return current
    }

    search(word: string): boolean {
        return this.findNode(word)?.isEndOfWord ?? false
    }

    searchByPrefix(prefix: string): element[] {
        const start = this.findNode(prefix)
        if (start === null) return []

        const results: element[] = []
        const stack: Node[] = [start]
        while (stack.length > 0) {
            const node = stack.pop()!
            if (node.isEndOfWord && node.element) results.push(node.element)
            stack.push(...Object.values(node.children))
        }
        return results
    }

    searchTopK(prefix: string, k: number): element[] {
        const heap = new MaxHeap()
        for (const item of this.searchByPrefix(prefix.trim())) heap.push(item)

        const top: element[] = []
        while (top.length < k && heap.size > 0) top.push(heap.pop()!)
        return top
    }
}

export default Trie
