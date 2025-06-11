import '@xyflow/react/dist/style.css';
import type { FC } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import type { Node, Edge, Connection } from '@xyflow/react';
import type { AiWorkFlowProps } from './types';
import { CONNECT_LINE_STYLE } from './const';
import { nodeTypes } from './config';
import ConnLine from './components/ConnLine';
import AddButton from './components/AddButton';
import { AiWorkFlowContext } from './context';

const AiWorkFlow: FC<AiWorkFlowProps> = (props) => {
  const { initialNodes = [] } = props;
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);

  // 插入多个节点
  const insertNodes = useMemoizedFn((newNodes: Node[]) => {
    for (const node of newNodes) {
      node.data.isFirstNode = !nodes.length;
      nodes.push(node);
    }
    setNodes([...nodes]);
  });

  // 更新多个节点
  const updateNodes = useMemoizedFn((newNodes: Node[]) => {
    for (const newNode of newNodes) {
      const index = nodes.findIndex(e => e.id === newNode.id);
      if (index > -1) nodes[index] = newNode;
    }
    setNodes([...nodes]);
  });

  // 处理连线
  const onConnect = useMemoizedFn((params: Connection) => {
    setEdges(eds => addEdge(params, eds).map(edge => {
      return { ...edge, ...CONNECT_LINE_STYLE };
    }));
  });

  return (
    <AiWorkFlowContext.Provider
      value={{
        insertNodes,
        updateNodes
      }}
    >
      <ReactFlow<Node>
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineComponent={ConnLine}
      >
        <Background />
        <AddButton />
      </ReactFlow>
    </AiWorkFlowContext.Provider>
  );
}

export default AiWorkFlow;