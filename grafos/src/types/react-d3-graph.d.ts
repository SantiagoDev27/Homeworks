declare module 'react-d3-graph' {
  import type { ComponentType } from 'react'

  export interface GraphProps {
    id: string
    data: {
      nodes: { id: string }[]
      links: { source: string; target: string }[]
    }
    config?: Record<string, unknown>
  }

  export const Graph: ComponentType<GraphProps>
}

