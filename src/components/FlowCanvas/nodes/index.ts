import type { CustomNodeConfig } from './types';
import UiNode from './uiNode';
import StartNode from './startNode';
import BranchNode from './branchNode';
import PromptNode from './promptNode';

export const customNodes: CustomNodeConfig[] = [
  {
    limit: 1,
    type: 'start-node',
    title: 'Start',
    desc: 'The starting node of a workflow.',
    Component: StartNode
  },
  {
    type: 'ui-node',
    title: 'UI',
    desc: 'The UI components within the AI assistant can be used as a data source to obtain data.',
    Component: UiNode
  },
  {
    type: 'brach-node',
    title: 'Branch',
    desc: 'Execute the corresponding process according to the different branches created.',
    Component: BranchNode
  },
  {
    type: 'prompt-node',
    title: 'Prompt',
    desc: 'Prompt the AI what to do or say.',
    Component: PromptNode
  }
];