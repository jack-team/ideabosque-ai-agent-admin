export type ValueType = 'string' | 'array' | 'object' | 'integer' | 'number';

export type SchemaType = {
  additionalProperties?: boolean;
  definitions?: any;
  properties?: Record<string, SchemaType>;
  required?: string[];
  type: ValueType;
  description?: string;
  // 默认值
  default?: any;
  // 枚举值
  enum?: any[];
  items?: SchemaType;
  maximum?: number;
  minimum?: number;
  title?: string;
  $ref?: string;
  const?: string;
}

export type LLMDataType = {
  llmName: string;
  llmProvider: string;
  moduleName: string;
  updatedAt: string;
  updatedBy: string;
  createdAt: string;
  className: string;
  configurationSchema: SchemaType;
}