"use client"
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
 
const elk = new ELK();
 
// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};
 
const getLayoutedElements = (nodes: Node[], edges: Edge[], options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
 
      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };
 
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),
 
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};
 

const position = { x: 0, y: 0 };
 
export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position,
  },
  { id: '7', type: 'output', data: { label: 'output' }, position },
];
 
export const initialEdges: Edge[] = [
  { id: 'e12', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e13', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e22a', source: '2', target: '2a', type: 'smoothstep' },
  { id: 'e22b', source: '2', target: '2b', type: 'smoothstep' },
  { id: 'e22c', source: '2', target: '2c', type: 'smoothstep' },
  { id: 'e2c2d', source: '2c', target: '2d', type: 'smoothstep' },
  { id: 'e45', source: '4', target: '5', type: 'smoothstep' },
  { id: 'e56', source: '5', target: '6', type: 'smoothstep' },
  { id: 'e57', source: '5', target: '7', type: 'smoothstep' },
];

export default function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { fitView } = useReactFlow();
 
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [],
  );

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
 
      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
 
          window.requestAnimationFrame(() => fitView());
        },
      );
    },
    [nodes, edges],
  );
 
  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, []);
 
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <Panel position="top-right">
        <button onClick={() => onLayout({ direction: 'DOWN' })}>
          vertical layout
        </button>
 
        <button onClick={() => onLayout({ direction: 'RIGHT' })}>
          horizontal layout
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
