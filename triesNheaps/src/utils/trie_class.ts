import Node from "./node_use"

class Trie {
    root: Node
    constructor() {
        this.root = new Node(null)
    }

    insert(word) {
        let current = this.root
        for (let character of word) {
            if (current.children[character] === undefined) {
                current.children[character] = new Node(character);
            }
            current = current.children[character]
        }
        current.isEndOfWord = true;

    }

    search(word) { }
}

