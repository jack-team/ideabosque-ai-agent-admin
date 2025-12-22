import { mcpCore } from '@/helper/request';
import {
  getListMcpModulesQl,
  deleteMcpModuleQl,
  insertUpdateMcpModuleQl,
  getListMcpFunctionsQl,
  deleteMcpFunctionQl,
  insertUpdateMcpFunctionQl,
  getListMcpFunctionCallsQl,
  deleteMcpFunctionCallQl,
  insertUpdateMcpFunctionCallQl,
  listMcpSettingsQl,
  insertUpdateMcpSettingQl
} from '@/qls/mcpConsole';

// 获取模块列表
export const getModuleListApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: getListMcpModulesQl, variables: params });
}

export const deleteMcpModuleApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: deleteMcpModuleQl, variables: params });
}

export const insertUpdateMcpModuleApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpModuleQl, variables: params });
}

// 获取函数列表
export const getFunctionListApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: getListMcpFunctionsQl, variables: params });
}

// 删除函数
export const deleteMcpFunctionApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: deleteMcpFunctionQl, variables: params });
}

// 插入或更新函数
export const insertUpdateMcpFunctionApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpFunctionQl, variables: params });
}

// 获取函数调用列表
export const getFunctionCallListApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: getListMcpFunctionCallsQl, variables: params });
}

// 删除函数调用
export const deleteMcpFunctionCallApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: deleteMcpFunctionCallQl, variables: params });
}

// 插入或更新函数调用
export const insertUpdateMcpFunctionCallApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpFunctionCallQl, variables: params });
}


export const getListMcpSettingsApi = (params: Record<string, any>) => {
  return mcpCore.graphql({ query: listMcpSettingsQl, variables: params });
}

export const insertUpdateMcpSettingApi = (params: Record<string, any>) => {
  return mcpCore.graphql({ query: insertUpdateMcpSettingQl, variables: params });
}