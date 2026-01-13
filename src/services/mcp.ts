import { apiCore, getSplitPageParams } from '@/utils/api';
import { mcpServerListQuery, insertUpdateMcpServerQuery, deleteMcpServerQuery } from '@/graphql/mcp';
import type { McpServerDataType } from '@/typings/mcp';

export const mcpServerListApi = (params: SplitPageParams) => {
  return apiCore.graphql<McpServerDataType[]>({
    query: mcpServerListQuery,
    variables: getSplitPageParams(params)
  });
}

export const insertUpdateMcpServerApi = (params: Record<string, any>) => {
  return apiCore.graphql<McpServerDataType>({
    query: insertUpdateMcpServerQuery,
    variables: params
  });
}

export const deleteMcpServerApi = (params: {
  mcpServerUuid: string;
}) => {
  return apiCore.graphql<McpServerDataType>({
    query: deleteMcpServerQuery,
    variables: params
  });
}