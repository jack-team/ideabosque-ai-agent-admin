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
    title: 'Start',
    desc: 'The starting node of a workflow.',
    Component: StartNode
  },
  {
    top: true,
    type: 'step',
    title: 'Step',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: StepNode
  },
  {
    type: 'ui',
    title: 'UI',
    desc: 'The UI components within the AI assistant can be used as a data source to obtain data.',
    Component: UiNode
  },
  {
    type: 'branch',
    title: 'Branch',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: BranchNode
  },
  {
    type: 'message',
    title: 'Prompt',
    desc: 'Prompt the AI what to do or say.',
    Component: PromptNode
  },
  {
    type: 'action',
    title: 'Action',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: ActionNode
  },
  {
    type: 'transform',
    title: 'Transform',
    desc: 'Convert the input data.',
    Component: TransformNode
  }
];