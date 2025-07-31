import type { FC, ReactElement } from 'react';
import type { NodeCollect } from '../../types';

export type NodeType =
  'step' |
  'start' |
  'ui' |
  'brach' |
  'prompt' |
  'action' |
  'transform';

export type NodeConfigType = {
  nodeType: NodeType;
  title: string;
  icon: FC<any>;
  desc: string;
  form: FC<any>;
}

export type SelectResult = {
  nodeType: NodeConfigType['nodeType'];
  triggerId: string;
  formData: Record<string, any>;
}

export type NodesProps = {
  triggerId: string;
  closeDrawer: () => void;
  onChange?: (result: SelectResult) => void;
}

export type SelectNodeDrawerProps = Omit<NodesProps, 'closeDrawer'> & {
  children: ReactElement<any>;
}
