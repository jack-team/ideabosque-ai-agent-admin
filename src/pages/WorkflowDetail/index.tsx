import { useCallback } from 'react';
import { Button, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { EditFilled, DownOutlined } from '@ant-design/icons';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position
} from 'reactflow';

import 'reactflow/dist/style.css';
import styles from './styles.module.less';
import ChatInput from './ChatInput';

const initialNodes = [
  {
    id: '1',
    type: 'chatInput',
    position: { x: 40, y: 40 }, data: { label: '1' }, sourcePosition: Position.Right
  },
  { id: '2', type: 'chatInput', position: { x: 300, y: 200 }, data: { label: '2' } },
];

const initialEdges: any[] = [];

const nodesTypes = {
  chatInput: ChatInput
}

function WorkflowDetail() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <PageContainer
      title="New business buyer onboarding"
      className="shopify"
      extra={[
        <Button className="shopify gray">
          <EditFilled />Edit
        </Button>,
        <Button 
        className="shopify gray">
          More actions<DownOutlined />
        </Button>,
        <Button type="primary" className="shopify">
          Turn on workflow
        </Button>
      ]}
    >
      <Card className="shopify">
        <div className={styles.container}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            minZoom={1.5}
            nodeTypes={nodesTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <Background className={styles.bg} />
          </ReactFlow>
        </div>
      </Card>
    </PageContainer>
  );
}

export default WorkflowDetail;