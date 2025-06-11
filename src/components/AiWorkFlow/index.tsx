import '@xyflow/react/dist/style.css';
import type { FC } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from '@xyflow/react';
import cloneDeep from 'clone-deep';
import { useMemoizedFn } from 'ahooks';
import type { Edge, Connection } from '@xyflow/react';
import type { AiWorkFlowProps, NodeType } from './types';
import type { DataType } from './components/NodeLayout/types';
import { CONNECT_LINE_STYLE, ConnectionTypes } from './const';
import { nodeTypes } from './config';
import ConnLine from './components/ConnLine';
import AddButton from './components/AddButton';
import { AiWorkFlowContext } from './context';
import './styles.less';

const AiWorkFlow: FC<AiWorkFlowProps> = (props) => {
  const { initialNodes = [], initialEdges = [] } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  // 插入多个节点
  const insertNodes = useMemoizedFn((newNodes: NodeType[]) => {
    for (const node of newNodes) {
      const data = node.data;
      const isFirstNode = !nodes.length;

      // 如果是第一个节点
      if (isFirstNode) {
        if (!data.connectionTypes) {
          const keys = Object.keys(ConnectionTypes);
          data.connectionTypes = keys;
        }

        const index = data.connectionTypes.
          findIndex(e => e === 'target');

        if (index > -1) {
          data.connectionTypes.splice(index, 1);
        };
      } else {
        const points = nodes.map(e => e.position.x);
        node.position.x = Math.max(...points) + 280;
      }

      nodes.push(node);
    }
    setNodes([...nodes]);
  });

  // 更单个节点
  const updateNodeData = useMemoizedFn((id: string, data: DataType) => {
    const index = nodes.findIndex(node => node.id === id);
    if (index > -1) {
      nodes[index].data = data;
      setNodes(cloneDeep(nodes));
    }
  });

  // 删除单个节点
  const deleteNode = useMemoizedFn((id: string) => {
    const index = nodes.findIndex(node => node.id === id);
    if (index > -1) {
      nodes.splice(index, 1);
      setNodes([...nodes]);
    }
  });

  // 处理连线
  const onConnect = useMemoizedFn((params: Connection) => {
    setEdges(eds => addEdge(params, eds).map(edge => {
      return { ...edge, ...CONNECT_LINE_STYLE };
    }));
  });

  console.log(nodes, edges)

  return (
    <AiWorkFlowContext.Provider
      value={{
        insertNodes,
        deleteNode,
        updateNodeData
      }}
    >
      <div className="ai_work_flow">
        <ReactFlowProvider>
          <ReactFlow<NodeType>
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
        </ReactFlowProvider>
      </div>
    </AiWorkFlowContext.Provider>
  );
}

export default AiWorkFlow;