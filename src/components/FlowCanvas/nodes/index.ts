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
    top: true,
    type: 'step',
    title: 'Step',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: StepNode
  },
  {
    limit: 1,
    type: 'start',
    title: 'Start',
    desc: 'The starting node of a workflow.',
    Component: StartNode
  },
  {
    type: 'ui',
    title: 'UI',
    desc: 'The UI components within the AI assistant can be used as a data source to obtain data.',
    Component: UiNode
  },
  {
    type: 'brach',
    title: 'Branch',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: BranchNode
  },
  {
    type: 'prompt',
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