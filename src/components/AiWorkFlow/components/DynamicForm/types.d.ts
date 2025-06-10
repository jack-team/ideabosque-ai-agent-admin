import { FormItemProps } from 'antd';
import type { ProFormColumnsType } from '@ant-design/pro-components';

type DependencyType = {
  name: string;
  values: any[];
  renders: Schema[];
}

type DataItem = {
  name: string;
  state: string;
};

export type Schema = {
  valueType?: string;
  title?: string;
  name?: string | string[];
  rules?: FormItemProps['rules'];
  valueEnum?: Record<string, any>;
  dependencys?: DependencyType[];
}

export type DynamicFormProps = {
  schemas: Schema[];
  onSubmit?: (formData: Record<string, any>) => Promise<void>; 
}

export type ProFormColumnType = ProFormColumnsType<DataItem>;