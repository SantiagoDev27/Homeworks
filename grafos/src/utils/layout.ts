import type { GraphData } from '../types/graph'

export const GRAPH_WIDTH = 900
export const GRAPH_HEIGHT = 650

const isCity = (id: string) => id.startsWith('city:')
const polar = (cx: number, cy: number, r: number, a: number) => ({
  x: cx + r * Math.cos(a),
  y: cy + r * Math.sin(a),
})

/** Grafo completo: ciudades en un círculo y sus personas en un anillo alrededor de cada una. */
export function layoutAll(data: GraphData): GraphData {
  const cx = GRAPH_WIDTH / 2
  const cy = GRAPH_HEIGHT / 2
  const ids = data.nodes.map((n) => n.id).sort()
  const cities = ids.filter(isCity)
  const cityOf = new Map<string, string>()
  for (const l of data.links) {
    if (isCity(l.source) && !isCity(l.target)) cityOf.set(l.target, l.source)
    else if (isCity(l.target) && !isCity(l.source)) cityOf.set(l.source, l.target)
  }
  const pos = new Map<string, { x: number; y: number }>()
  const R = cities.length > 1 ? Math.min(cx, cy) * 0.65 : 0
  cities.forEach((c, i) => {
    const a = (2 * Math.PI * i) / cities.length - Math.PI / 2
    const p = polar(cx, cy, R, a)
    pos.set(c, p)
    const members = ids.filter((id) => cityOf.get(id) === c)
    const ring = 55 + members.length * 6
    members.forEach((m, j) => pos.set(m, polar(p.x, p.y, ring, a + (2 * Math.PI * j) / members.length)))
  })
  const orphans = ids.filter((id) => !pos.has(id))
  orphans.forEach((id, i) => pos.set(id, polar(cx, cy, 30, (2 * Math.PI * i) / orphans.length)))
  return { ...data, nodes: data.nodes.map((n) => ({ ...n, ...pos.get(n.id) })) }
}

/** Vista de una ciudad: la ciudad al centro y sus habitantes en un anillo. */
export function layoutCity(data: GraphData, cityId: string): GraphData {
  const cx = GRAPH_WIDTH / 2
  const cy = GRAPH_HEIGHT / 2
  const residents = new Set<string>()
  for (const l of data.links) {
    if (l.source === cityId) residents.add(l.target)
    if (l.target === cityId) residents.add(l.source)
  }
  const keep = new Set<string>([cityId, ...residents])
  const links = data.links.filter((l) => keep.has(l.source) && keep.has(l.target))
  const inner = [...residents].sort()
  const pos = new Map<string, { x: number; y: number }>([[cityId, { x: cx, y: cy }]])
  const r1 = Math.max(110, inner.length * 22)
  inner.forEach((id, i) => pos.set(id, polar(cx, cy, r1, (2 * Math.PI * i) / inner.length - Math.PI / 2)))
  return {
    nodes: data.nodes.filter((n) => keep.has(n.id)).map((n) => ({ ...n, ...pos.get(n.id) })),
    links,
  }
}
