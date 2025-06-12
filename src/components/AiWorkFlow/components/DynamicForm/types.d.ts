import type { Key } from 'react';
import { FormItemProps } from 'antd';
import type { ProFormColumnsType, FieldPropsTypeBase } from '@ant-design/pro-components';

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
  tooltip?: string;
  name?: Key | Key[];
  width?: string;
  rules?: FormItemProps['rules'];
  valueEnum?: Record<string, any>;
  dependencys?: DependencyType[];
  initialValue?: any;
  columns?: Schema[];
  fieldProps?: FieldPropsTypeBase;
}

export type FormDataItem = {
  _type_: string;
  value: string | any[];
  label?: string;
}

export type FormData = Record<string, FormDataItem>;

export type DynamicFormResult = {
  formData: FormData;
}

export type DynamicFormProps = {
  schemas: Schema[];
  formData?: Record<string, any>;
  onSubmit?: (result: DynamicFormResult) => Promise<void>;
}

export type ProFormColumnType = ProFormColumnsType<DataItem>;

export type FormItemType = {
  type: string;
  name?: Key | Key[];
}