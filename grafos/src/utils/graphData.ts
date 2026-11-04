import type { SocialGraph } from '../models/SocialGraph'
import type { GraphData } from '../types/graph'

export const CITY_COLOR = 'orange'
export const PERSON_COLOR = 'lightblue'
export const RESIDENCE_COLOR = '#999999'
export const FRIEND_COLOR = 'green'

const isCity = (id: string) => id.startsWith('city:')


export function toGraphData({ graph }: SocialGraph): GraphData {
  const nodes = graph.nodes.map((id) => ({
    id,
    label: id.slice(id.indexOf(':') + 1),
    color: isCity(id) ? CITY_COLOR : PERSON_COLOR,
  }))

  const links: GraphData['links'] = []
  for (const source of graph.nodes) {
    for (const target of graph.adjList[source]) {
      if (source > target) continue
      const residence = isCity(source) || isCity(target)
      links.push({ source, target, color: residence ? RESIDENCE_COLOR : FRIEND_COLOR })
    }
  }

  return { nodes, links }
}
