import type { element } from "../types/element"

export default class MaxHeap {
    private items: element[] = []

    get size(): number {
        return this.items.length
    }

    push(item: element): void {
        this.items.push(item)
        this.siftUp(this.items.length - 1)
    }

    pop(): element | undefined {
        if (this.items.length === 0) return undefined
        const top = this.items[0]
        const last = this.items.pop()!
        if (this.items.length > 0) {
            this.items[0] = last
            this.siftDown(0)
        }
        return top
    }

    private siftUp(index: number): void {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2)
            if (this.items[parent].popularidad >= this.items[index].popularidad) break
            this.swap(parent, index)
            index = parent
        }
    }

    private siftDown(index: number): void {
        const n = this.items.length
        while (true) {
            const left = 2 * index + 1
            const right = left + 1
            let largest = index
            if (left < n && this.items[left].popularidad > this.items[largest].popularidad) largest = left
            if (right < n && this.items[right].popularidad > this.items[largest].popularidad) largest = right
            if (largest === index) break
            this.swap(index, largest)
            index = largest
        }
    }

    private swap(a: number, b: number): void {
        ;[this.items[a], this.items[b]] = [this.items[b], this.items[a]]
    }
}

