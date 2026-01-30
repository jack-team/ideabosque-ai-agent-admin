import { mcpCore, getSplitPageParams } from '@/utils/api';
import {
  mcpModuleListQuery,
  deleteMcpModuleQuery,
  insertUpdateMcpModuleQuery,
  getMcpFunctionListQuery,
  deleteMcpFunctionQl,
  insertUpdateMcpFunctionQl,
  getListMcpFunctionCallsQl,
  deleteMcpFunctionCallQl,
  insertUpdateMcpFunctionCallQl,
  listMcpSettingsQl,
  insertUpdateMcpSettingQl
} from '@/graphql/mcpConsole';

import type {
  McpModuleDataType,
  McpFunctionDataType,
  McpFunctionCallDataType,
  McpSettingDataType
} from '@/typings/mcpConsole';

// 获取模块列表
export const getModuleListApi = async (
  params: Record<string, any>
) => mcpCore.graphql<McpModuleDataType[]>({
  query: mcpModuleListQuery,
  variables: getSplitPageParams(params)
});

// 删除 Mcp Module
export const deleteMcpModuleApi = async (
  params: Record<string, any>
) => mcpCore.graphql({
  query: deleteMcpModuleQuery,
  variables: params
});

export const insertUpdateMcpModuleApi = async (
  params: Record<string, any>
) => mcpCore.graphql({
  query: insertUpdateMcpModuleQuery,
  variables: params
});

// 获取函数列表
export const getFunctionListApi = async (
  params: Record<string, any>
) => mcpCore.graphql<McpFunctionDataType[]>({
  query: getMcpFunctionListQuery,
  variables: getSplitPageParams(params)
});

// 删除函数
export const deleteMcpFunctionApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: deleteMcpFunctionQl, variables: params });
}

// 插入或更新函数
export const insertUpdateMcpFunctionApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpFunctionQl, variables: params });
}

// 获取函数调用列表
export const getFunctionCallListApi = async (
  params: Record<string, any>
) => mcpCore.graphql<McpFunctionCallDataType[]>({
  query: getListMcpFunctionCallsQl,
  variables: getSplitPageParams(params)
});

// 删除函数调用
export const deleteMcpFunctionCallApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: deleteMcpFunctionCallQl, variables: params });
}

// 插入或更新函数调用
export const insertUpdateMcpFunctionCallApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpFunctionCallQl, variables: params });
}


export const getListMcpSettingsApi = (params: Record<string, any>) => {
  return mcpCore.graphql<McpSettingDataType[]>({
    query: listMcpSettingsQl,
    variables: getSplitPageParams(params)
  });
}

export const insertUpdateMcpSettingApi = (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpSettingQl, variables: params });
}