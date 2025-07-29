import type { NodeProps, Node } from '@xyflow/react';

export type FlowInstance = {
  getData: () => any;
}

export type OptionType = {
  value: string;
  label: string;
}

// 输入输出的 key 和 label
export type ElementResultOptionType = OptionType & {
  required?: boolean;
  options?: OptionType[]; // 枚举值
  children?: ElementResultOptionType[];
}

// 普通元素都包含输入输出
export type ElementNormalType<T = unknown> = T & {
  input?: ElementResultOptionType[];
  output?: ElementResultOptionType[];
}

// 后端返回的 ui 组建的定义
export type UiComponentType = ElementNormalType<{
  componentId: string;
  componentTag: string;
  componentName: string;
  componentType: string;
}>;

// 后端返回的 Action
export type ActionFunctionType = ElementNormalType<{
  name: string;
  description: string;
}>;


export type NodeCollect = UiComponentType | ActionFunctionType;

export type NodeDataType = {
  data: NodeCollect;
}

export type FlowCanvasContextTypes = {
  actions?: ActionFunctionType[];
  transformTools?: OptionType[];
  uiComponents?: UiComponentType[];
}

export type NormalNodeType<D = any> = Node<{
  formData: D;
}>;

export type CustomNodeProps<T = any> = NodeProps<NormalNodeType<T>>;

export type CanvasProps = {
  defaultNodes?: NormalNodeType[];
}

export type FlowCanvasProps = FlowCanvasContextTypes & CanvasProps & {

}

