import { useMemo } from 'react'
import { Graph } from 'react-d3-graph'
import type { GraphData } from '../../types/graph'
import { GRAPH_HEIGHT, GRAPH_WIDTH, layoutAll, layoutCity } from '../../utils/layout'

const config = {
  staticGraph: true, // usa las posiciones x,y de cada nodo: el layout es siempre el mismo
  width: GRAPH_WIDTH,
  height: GRAPH_HEIGHT,
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 400,
    labelProperty: 'label',
    highlightStrokeColor: 'blue',
  },
  link: {
    highlightColor: 'lightblue',
  },
}

interface Props {
  data: GraphData
  /** Nombre de la ciudad a mostrar; '' = ver todos. */
  city: string
}

export default function GraphInit({ data, city }: Props) {
  const laid = useMemo(
    () => (city ? layoutCity(data, `city:${city}`) : layoutAll(data)),
    [data, city],
  )
  // key fuerza a react-d3-graph a reiniciar su estado interno al cambiar de vista o de datos
  const key = `${city}|${laid.nodes.length}|${laid.links.length}`
  return <Graph key={key} id="graph-id" data={laid} config={config} />
}
