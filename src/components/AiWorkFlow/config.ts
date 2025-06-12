import type { NodeTypes } from '@xyflow/react';
import UiNode from './nodes/UiNode';
import ActionNode from './nodes/ActionNode';
import TransformNode from './nodes/TransformNode';
import BranchNode from './nodes/BranchNode';
import PromptNode from './nodes/PromptNode';

export const nodeTypes: NodeTypes = {
  ui: UiNode,
  action: ActionNode,
  transform: TransformNode,
  branch: BranchNode,
  prompt: PromptNode
} 