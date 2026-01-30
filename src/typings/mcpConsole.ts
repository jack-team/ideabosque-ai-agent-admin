export type McpModuleDataType = {
  moduleName: string;
  packageName: string;
  source: string;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  classes: Array<{
    className: string;
    settingId: string;
  }>;
}

export type McpFunctionDataType = {
  functionName: string;
  description: string;
  className: string;
  mcpType: string;
  name: string;
  returnType: string;
  updatedAt: string;
  updatedBy: string;
  createdAt: string;
  isAsync: boolean;
  moduleName: string;
  data: Record<string, any>;
}

export type McpFunctionCallDataType = {
  arguments: Record<string, any>;
  content: string;
  createdAt: string;
  mcpFunctionCallUuid: string;
  mcpType: string;
  name: string;
  notes: string;
  status: string;
  timeSpent: number;
  updatedAt: string;
  updatedBy: string;
}

export type McpSettingDataType = {
  createdAt: string;
  settingId: string;
  updatedAt: string;
  setting: Record<string, any>;
}