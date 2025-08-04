import { useRequest } from 'ahooks';
import { requestWrapper } from '@/utils';
import {
  queryAgentWorkflowTemplatesApi,
  queryAgentWorkflowsApi,
  fetchuiComponentsApi,
  fetchMcpServersApi
} from '@/services/workflow';

import { getLlmListApi } from '@/services/llm';

// 获取模板数据
export const useWorkFlowTemplates = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(queryAgentWorkflowTemplatesApi);
    return result.promptTemplateList.promptTemplateList;
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.promptName,
    value: item.promptUuid
  }));

  return { loading, options };
}

// 获取组件列表
export const useUiComponents = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(fetchuiComponentsApi);
    return result.uiComponentList.uiComponentList;
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.tagName,
    value: [
      item.uiComponentUuid,
      item.uiComponentType
    ].join('__')
  }));

  return { loading, options };
}

export const useMcpServers = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(fetchMcpServersApi);
    return result.mcpServerList.mcpServerList;
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.mcpLabel,
    value: item.mcpServerUuid,
  }));

  return { options, loading };
}

export const useWorkflows = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(queryAgentWorkflowsApi);
    return result.flowSnippetList.flowSnippetList;
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.flowName,
    value: [
      item.flowSnippetUuid,
      item.flowSnippetVersionUuid
    ].join('__'),
  }));

  return { options, loading };
}

export const useLlms = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(getLlmListApi);
    return result.llmList.llmList as any[];
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.llmProvider,
    value: item.llmProvider
  }));

  return { options, loading };
}