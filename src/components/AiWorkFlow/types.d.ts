import type { FC } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import type { DataType } from './components/NodeLayout/types';

export type NodeComponent<D = any> = FC<NodeProps<Node<D>>>;

export type NodeType =  Node<DataType>;

export type AiWorkFlowProps = {
  initialNodes?: NodeType[];
}

export type AiWorkFlowContextTypes = {
  insertNodes: (nodes: NodeType[]) => void;
  updateNodeData: (id: string, data: DataType) => void;
}