class TrieNode {
  children: Map<string, TrieNode> = new Map()
  isEndOfWord = false
  originalTitle: string | null = null
}

export class Trie {
  private root: TrieNode = new TrieNode()

  private normalize(text: string): string {
    return text.trim().toLowerCase()
  }

  insert(title: string): void {
    const word = this.normalize(title)
    if (!word) {
      return
    }

    let current = this.root
    for (const char of word) {
      let nextNode = current.children.get(char)
      if (!nextNode) {
        nextNode = new TrieNode()
        current.children.set(char, nextNode)
      }
      current = nextNode
    }

    current.isEndOfWord = true
    current.originalTitle = title.trim()
  }

  search(title: string): boolean {
    const word = this.normalize(title)
    if (!word) {
      return false
    }

    let current = this.root
    for (const char of word) {
      const nextNode = current.children.get(char)
      if (!nextNode) {
        return false
      }
      current = nextNode
    }

    return current.isEndOfWord
  }

  getSuggestions(prefix: string): string[] {
    const cleanPrefix = this.normalize(prefix)
    if (!cleanPrefix) {
      return []
    }

    let current = this.root
    for (const char of cleanPrefix) {
      const nextNode = current.children.get(char)
      if (!nextNode) {
        return []
      }
      current = nextNode
    }

    const results: string[] = []
    this.collectWords(current, results)
    return results
  }

  private collectWords(node: TrieNode, results: string[]): void {
    if (node.isEndOfWord && node.originalTitle) {
      results.push(node.originalTitle)
    }

    for (const child of node.children.values()) {
      this.collectWords(child, results)
    }
  }
}
