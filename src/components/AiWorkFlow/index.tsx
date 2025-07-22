import "@xyflow/react/dist/style.css";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";
import cloneDeep from "clone-deep";
import { useMemoizedFn } from "ahooks";
import type { Edge, Connection } from "@xyflow/react";
import type { DataType } from "./components/NodeLayout/types";
import type { AiWorkFlowProps, NodeType, AiWorkFlowInstance } from "./types";
import { getShemas } from "./schemas";
import { nodeTypes } from "./config";
import { CONNECT_LINE_STYLE } from "./const";
import ConnLine from "./components/ConnLine";
import AddButton from "./components/AddButton";
import { AiWorkFlowContext } from "./context";
import { useAiWorkFlowContext } from "./hooks";
import "./styles.less";

const AiWorkFlow = forwardRef<AiWorkFlowInstance, AiWorkFlowProps>(
  (props, ref) => {
    const {
      role = "parent",
      initialNodes = [],
      initialEdges = [],
      mcpServers: _mcpServers = [],
      uiComponents: _uiComponents = [],
    } = props;

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
    const { uiComponents = _uiComponents, mcpServers = _mcpServers } =
      useAiWorkFlowContext();
      
    const schemas = useMemo(
      () => getShemas({ uiComponents, mcpServers }),
      [uiComponents, mcpServers]
    );

    // 插入多个节点
    const insertNodes = useMemoizedFn((newNodes: NodeType[]) => {
      for (const node of newNodes) {
        // 如果是第一个节点
        if (!nodes.length) {
          const data = node.data;
          if (!data.connectionTypes) {
            data.connectionTypes = ["source"];
          }
        } else {
          const points = nodes.map((e) => e.position.x);
          node.position.x = Math.max(...points) + 280;
        }
        nodes.push(node);
      }
      setNodes([...nodes]);
    });

    // 更单个节点
    const updateNodeData = useMemoizedFn((id: string, data: DataType) => {
      const index = nodes.findIndex((node) => node.id === id);
      if (index > -1) {
        nodes[index].data = data;
        setNodes(cloneDeep(nodes));
      }
    });

    // 删除单个节点
    const deleteNode = useMemoizedFn((id: string) => {
      const index = nodes.findIndex((node) => node.id === id);
      if (index > -1) {
        nodes.splice(index, 1);
        setNodes([...nodes]);
      }
    });

    // 处理连线
    const onConnect = useMemoizedFn((params: Connection) => {
      setEdges((eds) =>
        addEdge(params, eds).map((edge) => {
          return { ...edge, ...CONNECT_LINE_STYLE };
        })
      );
    });

    useImperativeHandle(ref, () => {
      return {
        getData: () => cloneDeep({ nodes, edges }),
      };
    });

    return (
      <AiWorkFlowContext.Provider
        value={{
          role,
          schemas,
          mcpServers,
          uiComponents,
          insertNodes,
          deleteNode,
          updateNodeData,
        }}
      >
        <div className="ai_work_flow">
          <ReactFlowProvider>
            <ReactFlow<NodeType>
              fitView
              nodes={nodes}
              edges={edges}
              minZoom={0.5}
              nodeTypes={nodeTypes}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              connectionLineComponent={ConnLine}
            >
              <Background size={2} color="#ccc" bgColor="#f6f6f6" />
              <AddButton />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </AiWorkFlowContext.Provider>
    );
  }
);

export default AiWorkFlow;
