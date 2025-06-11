import type { FC } from 'react';
import type { Node, NodeProps } from '@xyflow/react';

export type NodeComponent<D = any> = FC<NodeProps<Node<D>>>;

export type AiWorkFlowProps = {
  initialNodes?: Node[];
}

export type AiWorkFlowContextTypes = {
  insertNodes: (nodes: Node[]) => void;
  updateNodes: (nodes: Node[]) => void;
}