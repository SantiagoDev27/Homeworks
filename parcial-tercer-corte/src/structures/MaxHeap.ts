import type { Song } from '../types/song'

export class MaxHeap {
  private heap: Song[] = []

  insert(song: Song): void {
    this.heap.push({ ...song })
    this.heapifyUp(this.heap.length - 1)
  }

  extractMax(): Song | null {
    if (this.heap.length === 0) {
      return null
    }

    const max = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length > 0 && last) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return max
  }

  peek(): Song | null {
    return this.heap.length > 0 ? this.heap[0] : null
  }

  size(): number {
    return this.heap.length
  }

  getTop(limit: number): Song[] {
    const temp = new MaxHeap()
    temp.heap = [...this.heap]

    const top: Song[] = []
    const count = Math.min(limit, temp.size())
    for (let i = 0; i < count; i++) {
      const song = temp.extractMax()
      if (song) {
        top.push(song)
      }
    }

    return top
  }

  private heapifyUp(index: number): void {
    let current = index
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2)
      if (this.heap[current].plays <= this.heap[parent].plays) {
        break
      }
      this.swap(current, parent)
      current = parent
    }
  }

  private heapifyDown(index: number): void {
    let current = index
    const length = this.heap.length

    while (true) {
      const left = 2 * current + 1
      const right = 2 * current + 2
      let largest = current

      if (left < length && this.heap[left].plays > this.heap[largest].plays) {
        largest = left
      }

      if (right < length && this.heap[right].plays > this.heap[largest].plays) {
        largest = right
      }

      if (largest === current) {
        break
      }

      this.swap(current, largest)
      current = largest
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }
}
