import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Edge,
  type NodeTypes,
  type Connection,
} from "@xyflow/react";
import cloneDeep from "clone-deep";
import { type FC, useMemo, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { useMemoizedFn } from "ahooks";
import { customNodes } from "./nodes";
import { edgeTypes } from "./customEdge";
import { FlowCanvasInnerContext } from './context';
import { DefaultStartNode } from "./constants";
import type { NormalNodeType, CanvasProps } from './types';

export const nodeTypes = customNodes.reduce((o, c) => (
  { ...o, [c.type]: c.Component }
), {} as NodeTypes);

const Canvas: FC<CanvasProps> = (props) => {
  const {
    canvas,
    top = true,
    defaultNodes = [],
    defaultEdges = [],
  } = props;

  // 如果没有数据，默认一开始接点
  const initNodes = useMemo(() => {
    return defaultNodes.length ?
      defaultNodes :
      [cloneDeep(DefaultStartNode)];
  }, [defaultNodes]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(defaultEdges);
  const [nodes, _, onNodesChange] = useNodesState<NormalNodeType>(initNodes);
  const compEdages = edges.map(edge => ({ ...edge, type: 'step-edge' }));

  // 连线逻辑
  const handleLineConnect = useMemoizedFn(
    (connect: Connection) => setEdges((eds) => addEdge(connect, eds))
  );

  const getCanvasData = useMemoizedFn(() => {
    return cloneDeep({ edges, nodes });
  });

  useEffect(() => {
    if (canvas) {
      canvas.getData = getCanvasData;
    }
  }, [canvas, getCanvasData]);

  return (
    <FlowCanvasInnerContext value={{ top }}>
      <ReactFlow<NormalNodeType>
        minZoom={0.5}
        nodes={nodes}
        edges={compEdages}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
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
    </FlowCanvasInnerContext>
  );
};

export default Canvas;
