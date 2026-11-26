export class Graph {
  private adjacencyList: Map<string, Set<string>> = new Map()

  addVertex(songId: string): void {
    if (!this.adjacencyList.has(songId)) {
      this.adjacencyList.set(songId, new Set())
    }
  }

  addEdge(songA: string, songB: string): void {
    if (songA === songB) {
      return
    }

    this.addVertex(songA)
    this.addVertex(songB)

    this.adjacencyList.get(songA)?.add(songB)
    this.adjacencyList.get(songB)?.add(songA)
  }

  hasEdge(songA: string, songB: string): boolean {
    return this.adjacencyList.get(songA)?.has(songB) ?? false
  }

  getRelated(songId: string): string[] {
    return Array.from(this.adjacencyList.get(songId) ?? [])
  }
}
