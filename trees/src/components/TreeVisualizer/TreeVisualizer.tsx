import React from 'react';
import Tree from 'react-d3-tree';
import type { D3TreeNode } from '../../data-structures/BinarySearchTree';

interface TreeVisualizerProps {
    data: D3TreeNode | null;
}

// Función para renderizar el nodo personalizado (círculo blanco con texto oscuro centrado)
const renderCustomNode = ({ nodeDatum }: any) => (
    <g>
        <circle r="18" fill="#FFFFFF" stroke="none" />
        <text
            fill="#0F172A"
            strokeWidth="0"
            x="0"
            y="0"
            dy=".35em"
            textAnchor="middle"
            fontSize="13px"
            fontWeight="bold"
        >
            {nodeDatum.name}
        </text>
    </g>
);

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ data }) => {
    if (!data) return <p style={{ textAlign: 'center', color: '#94A3B8' }}>El árbol está vacío.</p>;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Tree
                data={data}
                orientation="vertical"
                pathFunc="straight"
                translate={{ x: 420, y: 50 }}
                collapsible={false}
                zoomable={true}
                nodeSize={{ x: 80, y: 80 }} 
                renderCustomNodeElement={renderCustomNode} 
            />
        </div>
    );
};