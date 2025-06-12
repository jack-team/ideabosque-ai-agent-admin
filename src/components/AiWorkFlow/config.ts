import UiNode from './nodes/UiNode';
import ActionNode from './nodes/ActionNode';
import TransformNode from './nodes/TransformNode';
import StepNode from './nodes/StepNode';
import PromptNode from './nodes/PromptNode';

export const nodeTypes = {
  ui: UiNode,
  action: ActionNode,
  transform: TransformNode,
  step: StepNode,
  branch: StepNode,
  prompt: PromptNode
} 