import type { element } from "../types/element"

export default class Node {
    value: string | null
    isEndOfWord: boolean
    children: Record<string, Node>
    element: element | null

    constructor(value: string | null) {
        this.value = value
        this.isEndOfWord = false
        this.children = {}
        this.element = null
    }
}
