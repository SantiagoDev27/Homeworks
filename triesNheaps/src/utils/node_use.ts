export default class Node {
    value: string | null
    isEndOfWord: boolean
    children: Record<string, Node>

    constructor(value: string | null) {
        this.value = value
        this.isEndOfWord = false
        this.children = {}
    }
}
