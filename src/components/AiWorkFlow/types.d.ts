import type { FC } from 'react';
import type { Node, NodeProps, Edge } from '@xyflow/react';
import type { DataType } from './components/NodeLayout/types';

export type NodeComponent<D = any> = FC<NodeProps<Node<D>>>;

export type NodeType = Node<DataType>;

export type AiWorkFlowProps = {
  initialNodes?: NodeType[];
  initialEdges?: Edge[];
  role?: "parent" | 'child';
}

export type FlowSaveResult = {
  nodes: NodeType[];
  edges: Edge[];
}

export type AiWorkFlowInstance = {
  getData: () => FlowSaveResult;
}

export type AiWorkFlowContextTypes = {
  role: AiWorkFlowProps['role'];
  deleteNode: (id: string) => void;
  insertNodes: (nodes: NodeType[]) => void;
  updateNodeData: (id: string, data: DataType) => void;
}