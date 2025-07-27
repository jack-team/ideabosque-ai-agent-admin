import type { CustomNodeConfig } from './types';
import UiNode from './uiNode';
import StartNode from './startNode';

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
  }
];