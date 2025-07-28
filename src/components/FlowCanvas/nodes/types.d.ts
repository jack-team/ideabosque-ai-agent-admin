import type { FC, ReactElement } from 'react';
import type { FormInstance } from '@ant-design/pro-components';
import type { CustomNodeProps } from '../types';
import { EditFormType } from '../components/NodeWrapper/types';

export interface CustomNodeFC<P = any> {
  (props: CustomNodeProps<P>): ReactElement;
  Form?: FC<FormProps>;
  Icon: FC<any>;
  modalWdith?: number;
}

export type FormProps = {
  form?: FormInstance;
}

export type CustomNodeConfig = {
  type: string;
  title: string;
  desc: string;
  // 限制的个数
  limit?: number;
  Component: CustomNodeFC;
}