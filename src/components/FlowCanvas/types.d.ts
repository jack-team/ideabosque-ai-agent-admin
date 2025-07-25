import type { NodeProps, Node } from '@xyflow/react';

export type FlowInstance = {
  getData: () => any;
}

// 输入输出的 key 和 label
export type ElementResultOptionType = {
  value: string;
  label: string;
}

// 普通元素都包含输入输出
export type ElementNormalType<T = unknown> = T & {
  input: ElementResultOptionType[];
  output: ElementResultOptionType[];
}

// 后端返回的 ui 组建的定义
export type UiComponentType = ElementNormalType<{
  componentId: string;
  componentTag: string;
  componentName: string;
  componentType: string;
}>;

export type FlowCanvasContextTypes = {
  uiComponents?: UiComponentType[];
}

export type NormalNodeType<D = any> = Node<{
  formData: D;
}>;

export type CustomNodeProps<T = any> = NodeProps<NormalNodeType<T>>;

export type CanvasProps = {
  defaultNodes: NormalNodeType[];
}

export type FlowCanvasProps = FlowCanvasContextTypes & CanvasProps & {

}

