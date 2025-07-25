import type { FC, ReactElement } from 'react';

export type NodeConfigType = {
  nodeType: string;
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
