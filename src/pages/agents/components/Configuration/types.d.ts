import type { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-form';

type SchemaProperties = Record<string, SchemaTypes>;

export type SchemaType = 'string' | 'object' | 'array';

export type SchemaTypes = {
  type: SchemaType,
  title?: string;
  required?: string[];
  description?: string;
  enum?: string[];
  default?: any;
  minimum?: number;
  maximum?: number;
  items?: SchemaTypes[];
  properties?: SchemaProperties;
}

export type ColumnType = ProFormColumnsType;