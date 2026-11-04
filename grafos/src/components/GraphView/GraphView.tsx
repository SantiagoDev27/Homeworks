import { Graph } from 'react-d3-graph'
import type { GraphData } from '../../types/graph'

const config = {
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

export default function GraphInit({ data }: { data: GraphData }) {
  return <Graph id="graph-id" data={data} config={config} />
}

