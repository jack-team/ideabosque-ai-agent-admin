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
import * as uuid from 'uuid';
import { useMemoizedFn, useMount } from 'ahooks';
import type { Node, Edge } from '@xyflow/react';
import type { AiWorkFlowProps } from './types';
import { nodeTypes } from './config';
import ConnLine from './components/ConnLine';
import AddButton from './components/AddButton';

const AiWorkFlow: FC<AiWorkFlowProps> = (props) => {
  const { initialNodes = [] } = props;
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const onConnect = useMemoizedFn((params) => {
    setEdges(eds => {
      const result = addEdge(params, eds);
      return result.map(item => {
        return {
          ...item,
          animated: false,
          style: { stroke: '#0143EC', strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#0143EC' },
        }
      });
    })
  });

  const onAdd = useMemoizedFn((type: string, formData: Record<string, any>) => {
    nodes.push({
      id: `${type}_${uuid.v4()}`,
      type,
      data: formData,
      position: { x: 100, y: 5 },
    });
    setNodes([...nodes]);
  });

  console.log(nodes)

  const onFirstAdd = useMemoizedFn(() => {

  });

  useMount(() => {
    if (!initialNodes.length) {
      setNodes([
        {
          "id": "uiComponent_a47cdab0-0d72-48cd-9bb4-8197d6fd596a",
          "type": "uiComponent",
          "data": {
            "componentName": "UploadFile",
            "componentTitle": "sqq",
            "waitFor": "qwww"
          },
          "position": {
            "x": 0,
            "y": 5
          },
          "measured": {
            "width": 262,
            "height": 123
          }
        },
        {
          "id": "uiComponent_791e2f35-ea26-405f-8bc0-cd72c701a900",
          "type": "uiComponent",
          "data": {
            "componentName": "QuestionGroup",
            "componentTitle": "dd33",
            "waitFor": "dd33"
          },
          "position": {
            "x": 350,
            "y": 5
          },
          "measured": {
            "width": 262,
            "height": 123
          }
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
      <AddButton onAdd={onAdd} />
    </ReactFlow>
  );
}

export default AiWorkFlow;