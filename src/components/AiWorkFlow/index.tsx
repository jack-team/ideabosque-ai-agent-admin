import '@xyflow/react/dist/style.css';
import type { FC } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import cloneDeep from 'clone-deep';
import { useMemoizedFn } from 'ahooks';
import type { Node, Edge, Connection } from '@xyflow/react';
import type { AiWorkFlowProps } from './types';
import { CONNECT_LINE_STYLE } from './const';
import { nodeTypes } from './config';
import ConnLine from './components/ConnLine';
import AddButton from './components/AddButton';
import { AiWorkFlowContext } from './context';
import './styles.less';

const AiWorkFlow: FC<AiWorkFlowProps> = (props) => {
  const { initialNodes = [] } = props;
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);

  // 插入多个节点
  const insertNodes = useMemoizedFn((newNodes: Node[]) => {
    for (const node of newNodes) {
      const isFirstNode = !nodes.length;
      node.data.isFirstNode = isFirstNode;

      if (!isFirstNode) {
        const points = nodes.map(e => e.position.x);
        node.position.x = Math.max(...points) + 280;
      }

      nodes.push(node);
    }
    setNodes([...nodes]);
  });

  // 更单个节点
  const updateNodeData = useMemoizedFn((id: string, data: Record<string, any>) => {
    const index = nodes.findIndex(node => node.id === id);
    if (index > -1) {
      nodes[index].data = data;
      setNodes(cloneDeep(nodes));
    }
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
        updateNodeData
      }}
    >
      <div className="ai_work_flow">
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
      </div>
    </AiWorkFlowContext.Provider>
  );
}

export default AiWorkFlow;