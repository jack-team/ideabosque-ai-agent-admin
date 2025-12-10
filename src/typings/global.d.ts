declare type GlobalNoop = (this: any, ...args: any[]) => any;

declare type ServiceSendPayload = {
  query: string;
  variables?: Record<string, any>;
};

declare type SplitPageParams<Params extends {} = {}> = {
  pageNumber: number;
  limit: number;
} & Params;

declare type SplitPageResult<K extends keyof any, V> = Record<K, Record<K, V[]> & {
  total: number;
  pageNumber: number;
  pageSize: number;
}>;

declare type GenerateQueryParams = {
  name: string;
  type: 'Query' | 'Mutation';
}

declare type GenerateQueryResult = {
  query: string;
  function_name: string;
  operation_name: string;
}

//sdk
type AiChatSdkFunc = {
  createChat(options: Record<string, any>): AgentSdkInstance;
}

type AgentSdkVariableConfigType = {
  variable: string;
  label: string;
  desc: string;
  value: Key;
  unit?: string; //单位如 rem、px
  variableType?: 'text' | 'file';
  name: string[];
  formItemConfigs?: Record<string, any>;
}

type AgentSdkVariableType =
  'BoxModelConfigs' |
  'ColorConfigs' |
  'FontSizeConfigs' |
  'TextConfigs' |
  'IconConfigs' |
  'TextConfigs';

type AgentSdkVariableValueType =
  'GlobalCssVariables' |
  'GlobalUiVariables';

type AgentSdkVariables = Record<
  'chat' | 'bubble',
  Record<
    AgentSdkVariableType,
    AgentSdkVariableConfigType[]
  > & Record<
    AgentSdkVariableValueType,
    Record<string, any>
  >
>;

type AgentSdkInitResult = {
  bridge: Record<string, any>;
  data: AgentSdkVariables;
};

type AgentSdkInstance = {
  init(): Promise<AgentSdkInitResult>;
  variables: AgentSdkInitResult['data'];
  updateThemeConfigs: (values: Record<string, any>) => void;
  bubbleExpand: () => void;
  bubbleCollapse: () => void;
  windowExpand: () => void;
  windowCollapse: () => void;
  destroy: () => void;
  resetThemeConfigs: () => void;
  clearAllHistory: () => void;
  insertHistory: () => void;
  setOpenMode: (mode: string) => void; 
  updateChatConfigs: (configs: Record<string, any>) => void;
}

declare const AiChatSdk: AiChatSdkFunc;