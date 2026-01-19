import { apiCore, apiCoordination, getSplitPageParams } from '@/utils/api';
import type { AgentDataType, CoordinationDataType } from '@/typings/agent';

import {
  agentListQuery,
  coordinationListQuery,
  coordinationQuery,
  agentDetailQuery,
  insertUpdateAgentQuery,
  insertUpdateCoordinationQuery,
  deleteCoordinationQuery
} from '@/graphql/agent';

// 获取agent 列表
export const agentListApi = (
  params?: SplitPageParams<{
    agentUuid?: string;
    statuses?: string[]
  }>
) => apiCore.graphql<AgentDataType[]>({
  query: agentListQuery,
  variables: getSplitPageParams(params)
});

// 获取 angent 详情
export const agentDetailApi = (params: {
  agentUuid: string;
  agentVersionUuid: string;
}) => apiCore.graphql<AgentDataType>({
  query: agentDetailQuery,
  variables: params
});

// 获取coordination列表
export const coordinationListApi = (
  params: SplitPageParams<{
    coordinationUuid?: string;
    statuses?: string[];
  }>
) => apiCoordination.graphql<CoordinationDataType[]>({
  query: coordinationListQuery,
  variables: getSplitPageParams(params)
});

export const coordinationDetailApi = (params: {
  coordinationUuid: string;
}) => apiCoordination.graphql<CoordinationDataType>({
  query: coordinationQuery,
  variables: params
});

export const insertUpdateAgentApi = (
  params: Record<string, any>
) => apiCore.graphql<AgentDataType>({
  query: insertUpdateAgentQuery,
  variables: params
});

export const insertUpdateCoordinationApi = (
  params: Record<string, any>
) => apiCoordination.graphql<AgentDataType>({
  query: insertUpdateCoordinationQuery,
  variables: params
});

export const deleteCoordinationApi = (params: {
   coordinationUuid: string;
}) => apiCoordination.graphql<AgentDataType>({
  query: deleteCoordinationQuery,
  variables: params
});