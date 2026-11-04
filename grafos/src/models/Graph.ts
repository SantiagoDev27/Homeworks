export type AdjacencyList = Record<string, string[]>

export class Graph {
  nodes: string[]
  adjList: AdjacencyList

  constructor() {
    this.nodes = []
    this.adjList = {}
  }

  addNode(node: string): void {
    if (!this.searchNode(node)) {
      this.nodes.push(node)
      this.adjList[node] = []
    }
  }

  addEdge(node1: string, node2: string): void {
    this.adjList[node1].push(node2)
    this.adjList[node2].push(node1)
  }

  searchNode(node: string): string | undefined {
    if (!this.nodes.length) return
    return this.nodes.find((n) => n === node)
  }

  printAdjacency(node: string): void {
    if (this.searchNode(node)) {
      console.log(this.adjList[node])
    }
  }

  printGraph(): void {
    console.log(this.adjList)
  }
}

