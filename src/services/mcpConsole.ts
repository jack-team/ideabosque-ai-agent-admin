import { mcpCore } from '@/helper/request';
import { getListMcpModulesQl, deleteMcpModuleQl, insertUpdateMcpModuleQl } from '@/qls/mcpConsole';

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