import type { FC } from 'react';
import type { Node, NodeProps, Edge } from '@xyflow/react';
import type { DataType } from './components/NodeLayout/types';
import type { Schema } from './components/DynamicForm/types';

export type NodeComponent<D = any> = FC<NodeProps<Node<D>>>;

export type NodeType = Node<DataType>;

export type NodeShemaType = {
  type: string;
  icon: string;
  title: string;
  modalWidth: number;
  desc: string;
  formSchema: Schema[];
}

export type AiWorkFlowProps = {
  initialNodes?: NodeType[];
  initialEdges?: Edge[];
  role?: "parent" | 'child';
  mcpServers?: API.Workflow.McpServerItem[];
  uiComponents?: API.Workflow.UiComponentType[];
}

export type FlowSaveResult = {
  nodes: NodeType[];
  edges: Edge[];
}

export type AiWorkFlowInstance = {
  getData: () => FlowSaveResult;
}

export type AiWorkFlowContextTypes = {
  schemas?: NodeShemaType[];
  role: AiWorkFlowProps['role'];
  deleteNode: (id: string) => void;
  insertNodes: (nodes: NodeType[]) => void;
  updateNodeData: (id: string, data: DataType) => void;
  mcpServers?: API.Workflow.McpServerItem[];
  uiComponents?: API.Workflow.UiComponentType[];
}