import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  MarkerType
} from '@xyflow/react';

import { useMemoizedFn } from 'ahooks';

import '@xyflow/react/dist/style.css';

import CustomNode from './node';
import ConnectionLine from './ConnectionLine';

const initialNodes = [
  {
    id: 'connectionline-1',
    type: 'custom',
    data: { label: 'Node 1' },
    position: { x: 0, y: 5 },
  },
  {
    id: 'connectionline-2',
    type: 'custom',
    data: { label: 'Node 1' },
    position: { x: 100, y: 5 },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

const ConnectionLineFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  const onConnect = useMemoizedFn((params) => {
    setEdges(eds => {
      const result = addEdge(params, eds);
      return result.map(item => {
        console.log(JSON.stringify(item))
        return {
          ...item,
          animated: false,
          style: { stroke: '#0143EC', strokeWidth: 2 },
          markerStart: { type: MarkerType.ArrowClosed, color: '#0143EC' },
        }
      });
    })
  });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineComponent={ConnectionLine}
      onConnect={onConnect}
      fitView
      fitViewOptions={{
        padding: 0.2,
      }}
    >
      <Background />
    </ReactFlow>
  );
};

export default ConnectionLineFlow;