import type { NodeProps, Node, Edge } from '@xyflow/react';

export type OptionType = {
  value: string;
  label: string;
}

// 输入输出的 key 和 label
export type ElementResultOptionType = {
  label: string;
  name: string;
  initialValue?: string;
  disabled?: boolean;
  readonly?: boolean;
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

export type FlowContextTypes = {
  detailId?: string;
  actions?: ActionFunctionType[];
  transformTools?: OptionType[];
  uiComponents?: UiComponentType[];
  closeDetail: () => void;
  openDetail: (id: string) => void;
}

export type CanvasContextTypes = {
  // 是否最顶层
  top?: boolean;
}

export type FlowInstanceGetDataResult = {
  realDetails: GetDataResult;
  assembleData: AssembleDataResult[];
}

export type FlowInstance = {
  getData: () => FlowInstanceGetDataResult | null;
}

export type CanvasInstance = {
  getData: () => GetDataResult | null;
}

export type NormalNodeType<D extends {} = {}> = Node<{
  formData?: D & {
    branch?: OptionType[]
  };
  details?: GetDataResult<D>;
}>;

export type CustomNodeProps<T = any> = NodeProps<NormalNodeType<T>>;

export type CanvasProps = {
  // 是否为顶层
  top?: boolean;
  defaultNodes?: NormalNodeType[];
  defaultEdges?: Edge[];
  canvas?: CanvasInstance;
  flow?: FlowInstance;
}

export type FlowCanvasProps = CanvasProps & Omit<
  FlowContextTypes,
  'detailId' |
  'openDetail' |
  'closeDetail'
>

export type GetDataResult<D extends {} = {}> = {
  nodes: NormalNodeType<D>[];
  edges: Edge[];
}

export type ConditionType = {
  condition?: string | null;
  nextStep?: string;
}

export type EdgeLinkType = {
  id: string;
  type?: string;
  formData?: Record<string, any>;
  conditions?: ConditionType[];
  nextStep?: string;
}

export type AssembleDataResult = EdgeLinkType & {
  details?: AssembleDataResult[];
}