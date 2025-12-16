import { mcpCore } from '@/helper/request';
import { getListMcpModulesQl } from '@/qls/mcpConsole';

export const getModuleListApi = async (params: Record<string, any>) => {
  return mcpCore.graphql({ query: getListMcpModulesQl, variables: params });
}