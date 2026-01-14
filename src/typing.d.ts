declare module '*.svg?react' {
  import * as React from 'react';
  type SvgProps = React.ComponentProps<"svg"> & {
    title?: string;
    desc?: string;
    titleId?: string;
    descId?: string;
  }
  export default React.FunctionComponent<SvgProps>;
}

declare type SplitPageParams<Params extends Record<string, any> = {}> = Params & {
  current?: number;
  pageSize?: string;
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
> & {
  chatUrl: string;
};

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
  updateChatConfigs: (configs: Record<string, any>) => Promise<AgentSdkInitResult>;
}

declare const AiChatSdk: AiChatSdkFunc;