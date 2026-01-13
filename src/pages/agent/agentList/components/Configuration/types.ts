import type { FormItemProps } from 'antd';
import type { SchemaType } from '@/typings/llm';

export type SchemaFormProps = {
  schema: SchemaType;
  formData?: Record<string, any>;
  onSubmit?: (formData: Record<string, any>) => void;
}

export type ConfigurationProps = Omit<SchemaFormProps, 'formData' | 'onSubmit'> & {
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
}

export type SchemaOptions = {
  required?: string[];
  parentKey?: string;
  index?: number;
  floor?: number;
  isRequired?: boolean;
  fullName?: NonNullable<FormItemProps['name']>
}