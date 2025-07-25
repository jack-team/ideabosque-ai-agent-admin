import type { NodeTypes } from '@xyflow/react';
import UiNode from './uiNode';
import StartNode from './startNode';

export const customNodes: NodeTypes = {
  'ui-node': UiNode,
  'start-node': StartNode
}

export default customNodes;