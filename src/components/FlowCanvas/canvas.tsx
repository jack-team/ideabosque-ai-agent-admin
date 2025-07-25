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
import { type FC, useMemo } from "react";
import "@xyflow/react/dist/style.css";
import { useMemoizedFn } from "ahooks";
import { customNodes } from "./nodes";
import { edgeTypes } from "./customEdge";
import { DefaultStartNode } from "./constants";
import type { NormalNodeType, CanvasProps } from './types';

const Canvas: FC<CanvasProps> = (props) => {
  const { defaultNodes = [] } = props;

  const initNodes = useMemo(() => {
    return defaultNodes.length ?
      defaultNodes :
      [DefaultStartNode];
  }, [defaultNodes]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodes, _, onNodesChange] = useNodesState<NormalNodeType>(initNodes);
  const compEdages = edges.map(edge => ({ ...edge, type: 'step-edge' }));

  // 连线逻辑
  const handleLineConnect = useMemoizedFn(
    (connect: Connection) => setEdges((eds) => addEdge(connect, eds))
  );

  return (
    <ReactFlowProvider>
      <ReactFlow<NormalNodeType>
        minZoom={0.5}
        nodes={nodes}
        edges={compEdages}
        edgeTypes={edgeTypes}
        nodeTypes={customNodes}
        // 禁用键盘删除
        deleteKeyCode={null}
        onConnect={handleLineConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
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

export default Canvas;
