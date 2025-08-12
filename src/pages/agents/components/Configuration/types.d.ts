import type { BetaSchemaForm, ProFormItemProps } from '@ant-design/pro-components';
import type { DefaultOptionType } from 'antd/es/select';

export type SchemaType = 'string' | 'object' | 'array' | 'integer';

export type SchemaTypes = {
  type: SchemaType,
  title?: string;
  required?: string[];
  description?: string;
  enum?: string[];
  default?: any;
  minimum?: number;
  maximum?: number;
  items?: SchemaTypes;
  properties?: Record<string, SchemaTypes>;
  definitions?: Record<string, SchemaTypes>;
}

export type FormItemType = {
  label: string;
  tip?: string;
  type: SchemaType;
  name: NonNullable<ProFormItemProps['name']>;
  required?: boolean;
  options?: DefaultOptionType[];
  children?: FormItemType[];
  items?: FormItemType[];
  hasList?: boolean;
  minimum?: number;
  maximum?: number;
}

export type ConfigurationProps = {
  schema: SchemaTypes;
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
}

export type ValidateNumberOptions = {
  min?: number;
  max?: number;
  allowDecimal?: number;
}