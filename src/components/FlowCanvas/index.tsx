import { type FC, useMemo } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemoizedFn } from "ahooks";
import { customNodes } from "./customNodes";
import { ConnectLineStyle } from "./constants";

const FlowCanvas: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: 'xxx',
      type: 'ui-node',
      data: {a: 1},
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 'aaa',
      type: 'ui-node',
      data: {a: 1},
      position: {
        x: 0,
        y: 0
      }
    }
  ]);
  
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const computedEdges = useMemo(
    () => edges.map((edge) => ({ ...edge, ...ConnectLineStyle })),
    [edges]
  );

  // 连线逻辑
  const handleLineConnect = useMemoizedFn((connect: Connection) => {
    setEdges((eds) => addEdge(connect, eds));
  });

  return (
    <ReactFlowProvider>
      <ReactFlow
        fitView
        minZoom={0.5}
        nodes={nodes}
        edges={computedEdges}
        nodeTypes={customNodes}
        onConnect={handleLineConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background
          size={2}
          color="#ccc"
          bgColor="#f6f6f6"
        />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
