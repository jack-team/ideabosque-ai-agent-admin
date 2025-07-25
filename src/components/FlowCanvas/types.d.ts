export type FlowInstance = {
  getData: () => any;
}

export type NodeResultType = {
  value: string;
  label: string;
}

export type NodeNormalType<T = unknown> = T & {
  input: NodeResultType[];
  output: NodeResultType[];
}

export type UiComponentType = NodeNormalType<{
  componentId: string;
  componentTag: string;
  componentName: string;
  componentType: string;
}>;

export type FlowCanvasContextTypes = {
  uiComponents?: UiComponentType[];
}

export type FlowCanvasProps = FlowCanvasContextTypes & {

}