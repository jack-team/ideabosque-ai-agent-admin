import '@xyflow/react/dist/style.css';
import type { FC } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { useMemoizedFn, useMount } from 'ahooks';
import type { Node, Edge } from '@xyflow/react';
import type { AiWorkFlowProps } from './types';

import { nodeTypes } from './config';

import ConnLine from './components/ConnLine';
import AddButton from './components/AddButton';

// const initialNodes: Node[] = [
//   {
//     id: 'connectionline-1',
//     type: 'custom',
//     data: { label: 'Node 1' },
//     position: { x: 0, y: 5 },
//   },
//   {
//     id: 'connectionline-2',
//     type: 'custom',
//     data: { label: 'Node 1' },
//     position: { x: 100, y: 5 },
//   },
// ];

const AiWorkFlow: FC<AiWorkFlowProps> = (props) => {
  const { initialNodes = [] } = props;
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

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

  const onFirstAdd = useMemoizedFn(() => {

  });

  useMount(() => {
    if (!initialNodes.length) {
      setNodes([
        {
          id: 'first-add',
          type: 'firstAdd',
          position: { x: 0, y: 0 },
          data: { onClick: onFirstAdd }
        }
      ]);
    }
  });

  return (
    <ReactFlow<Node>
      fitView
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitViewOptions={{ padding: 0.2 }}
      connectionLineComponent={ConnLine}
    >
      <Background />
      <AddButton />
    </ReactFlow>
  );
}

export default AiWorkFlow;