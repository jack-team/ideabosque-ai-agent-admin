import { useRequest } from 'ahooks';
import {
  agentDetailApi,
  agentListApi,
  coordinationDetailApi,
  coordinationListApi
} from '@/services/agent';
import type { AgentDataType, CoordinationDataType } from '@/typings/agent';
import { promptTemplateDetailApi } from '@/services/workflow';
import type { PromptTemplateDataType } from '@/typings/workflow';

type SuccessFn<D extends object> = (data: D) => void;

// 获取 Agent 详情
export const useAgentDetail = (params?: {
  agentUuid: string,
  agentVersionUuid: string;
}, onSuccess?: SuccessFn<AgentDataType>) => useRequest(async () => {
  const result = await agentDetailApi({
    agentUuid: params!.agentUuid,
    agentVersionUuid: params!.agentVersionUuid
  });
  onSuccess?.(result);
  return result;
}, {
  ready: !!params,
  refreshDeps: [
    params?.agentUuid,
    params?.agentVersionUuid
  ]
});


//获取模板详情
export const useTemplateDetail = (
  promptUuid?: string,
  onSuccess?: SuccessFn<PromptTemplateDataType>,
  disabled = false
) => useRequest(async () => {
  const result = await promptTemplateDetailApi({ promptUuid });
  onSuccess?.(result);
  return result;
}, {
  ready: !!promptUuid && !disabled,
  refreshDeps: [promptUuid]
});

// 获取 agent 列表
export const useAgentList = (params?: {
  agentUuid?: string;
  statuses?: string[]
}) => useRequest(async () => {
  const result = await agentListApi(params);
  return result.data || [];
}, {
  cacheTime: 60 * 1000,
  cacheKey: `agents-${params ? JSON.stringify(params) : 'default'}`
});

export const useCoordinationList = (params: {
  coordinationUuid?: string;
  statuses?: string[];
}) => useRequest(async () => {
  const result = await coordinationListApi(params);
  return result.data || [];
}, {
  cacheTime: 60 * 1000,
  cacheKey: `coordinations-${params ? JSON.stringify(params) : 'default'}`
});

export const useCoordinationDetail = (
  params?: { coordinationUuid: string; },
  onSuccess?: SuccessFn<CoordinationDataType>
) => {
  const coordId = params?.coordinationUuid;
  return useRequest(async () => {
    const result = await coordinationDetailApi({
      coordinationUuid: coordId!
    });
    onSuccess?.(result);
    return result;
  }, {
    ready: Boolean(coordId),
    refreshDeps: [coordId]
  })
};