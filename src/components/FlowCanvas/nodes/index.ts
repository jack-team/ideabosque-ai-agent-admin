import type { CustomNodeConfig } from './types';
import UiNode from './uiNode';
import StartNode from './startNode';
import BranchNode from './branchNode';
import PromptNode from './promptNode';
import ActionNode from './actionNode';
import TransformNode from './transformNode';
import StepNode from './stepNode';

export const customNodes: CustomNodeConfig[] = [
  {
    limit: 1,
    top: true,
    type: 'start',
    title: 'flowCanvas.start',
    desc: 'flowCanvas.startDesc',
    Component: StartNode
  },
  {
    top: true,
    type: 'step',
    title: 'flowCanvas.step',
    desc: 'flowCanvas.stepDesc',
    Component: StepNode
  },
  {
    type: 'ui',
    title: 'flowCanvas.ui',
    desc: 'flowCanvas.uiDesc',
    Component: UiNode
  },
  {
    type: 'branch',
    title: 'flowCanvas.branch',
    desc: 'flowCanvas.branchDesc',
    Component: BranchNode
  },
  {
    type: 'message',
    title: 'flowCanvas.prompt',
    desc: 'flowCanvas.promptDesc',
    Component: PromptNode
  },
  {
    type: 'action',
    title: 'flowCanvas.action',
    desc: 'flowCanvas.actionDesc',
    Component: ActionNode
  },
  {
    type: 'transform',
    title: 'flowCanvas.transform',
    desc: 'flowCanvas.transformDesc',
    Component: TransformNode
  }
];