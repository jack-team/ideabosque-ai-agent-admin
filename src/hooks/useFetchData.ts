import { useRequest } from 'ahooks';
import { requestWrapper } from '@/utils';
import dayjs from 'dayjs';
import {
  queryAgentWorkflowTemplatesApi,
  queryAgentWorkflowsApi,
  fetchuiComponentsApi,
  fetchMcpServersApi
} from '@/services/workflow';
import {
  getLlmListApi
} from '@/services/llm';
import {
  getWizardListApi,
  getElementsApi
} from '@/services/wizard';
import {
  getAgentListApi
} from '@/services/agent';
import {
  StatusEnum
} from '@/constants/enum';

// 获取模板数据
export const useWorkFlowTemplates = (params?: Record<string, any>) => {
  return useRequest(async () => {
    const result = await requestWrapper(queryAgentWorkflowTemplatesApi, params);
    return result?.promptTemplateList?.promptTemplateList;
  });
}

// 获取模板数据-active状态，基于promptUuid维度
export const useWorkFlowTemplatesActiveOptions = () => {
  const { loading, data = [] } = useWorkFlowTemplates({
    statuses: [StatusEnum.Active]
  });

  const options = data.map(item => {
    return {
      label: item.promptName,
      value: item.promptUuid,
      realData: item
    }
  });

  return { options, loading };
}

// 获取模板数据-以Version为维度
export const useWorkFlowTemplatesVersionOptions = (promptUuid: string) => {
  const { loading, data = [] } = useWorkFlowTemplates({ promptUuid });

  const options = data.map(item => {
    const createTime = dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss');
    return {
      label: createTime,
      value: item.promptVersionUuid,
      realData: item
    }
  });

  return { options, loading };
}

// 获取组件列表
export const useUiComponents = () => {
  const { data, loading } = useRequest(async () => {
    const result = await requestWrapper(fetchuiComponentsApi);
    return result?.uiComponentList?.uiComponentList;
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

// 获取Workflows列表
export const useWorkflowList = (params?: Record<string, any>) => {
  return useRequest(async () => {
    const result = await requestWrapper(queryAgentWorkflowsApi, params);
    return result?.flowSnippetList?.flowSnippetList || [];
  });
}

// 获取Workflows
export const useWorkflows = () => {
  const { data, loading } = useWorkflowList({
    statuses: [StatusEnum.Active]
  });

  const options = data?.map(item => ({
    realData: item,
    label: item.flowName,
    value: item.flowSnippetVersionUuid,
  }));

  return { options, loading };
}


// 获取 llm
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

// 获取 agent 列表
export const useAgentList = (params?: Record<string, any>) => {
  return useRequest(async () => {
    const result = await requestWrapper(getAgentListApi, params);
    return result?.agentList?.agentList as any[];
  }, {
    refreshDeps: [params ? JSON.stringify(params) : null]
  });
}

export const useAgentOptions = () => {
  const { data = [], loading } = useAgentList({
    statuses: [StatusEnum.Active]
  });

  const options = data.map(item => (
    {
      label: item.agentName,
      value: item.agentUuid,
      realData: item
    }
  ));

  return { loading, options }
}


// 获取agents 版本
export const useAgentVersions = (agentUuid?: string) => {
  if (!agentUuid) return { loading: false, options: [] };
  const { data, loading } = useAgentList({ agentUuid });

  const options = data?.map(e => {
    const createTime = dayjs(e.createdAt).format('YYYY-MM-DD HH:mm:ss');
    return {
      label: `${createTime}`,
      value: e.agentVersionUuid
    }
  });

  return {
    loading,
    options
  }
}

// 获取Wizards
export const useWizardList = () => {
  return useRequest(async () => {
    const result = await requestWrapper(getWizardListApi);
    return result.wizardList?.wizardList;
  });
}

export const useWizardOptions = () => {
  const { loading, data = [] } = useWizardList();

  const options = data.map((item: any) => (
    {
      label: item.wizardTitle,
      value: item.wizardUuid,
      realData: item
    }
  ));

  return {
    loading,
    options
  }
}

// 获取 elements
export const useElementsList = () => {
  return useRequest(async () => {
    const result = await requestWrapper(getElementsApi);
    return result.elementList?.elementList;
  });
}

export const useElementOptions = () => {
  const { data = [], loading } = useElementsList();

  const options = data.map((item: any) => {
    return {
      label: item.elementTitle,
      value: item.elementUuid,
      realData: item
    }
  });

  return { options, loading };
}