export interface City {
  name: string
}

export interface Person {
  name: string
  age: number
  city: string
}

export interface GraphNode {
  id: string
  label: string
  color: string
}

export interface GraphLink {
  source: string
  target: string
  color: string
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}
