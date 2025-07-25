import type { FC } from 'react';

export type NodeConfigType = {
  nodeType: string;
  title: string;
  icon: FC<any>;
  desc: string;
  form: FC<any>;
}