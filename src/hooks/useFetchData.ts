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
import { useFetchDataStore } from '@/store/fetchDataCache';

// 获取模板数据
export const useWorkFlowTemplates = (params?: Record<string, any>) => {
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  return useRequest(async () => {
    const cacheKey = `workflow-templates-${JSON.stringify(params || {})}`;
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(queryAgentWorkflowTemplatesApi, params);
    const data = result?.promptTemplateList?.promptTemplateList;
    setCache(cacheKey, data);
    return data;
  });
}

// 获取模板数据-active状态，基于promptUuid维度
export const useWorkFlowTemplatesActiveOptions = () => {
  const { loading, data = [] } = useWorkFlowTemplates({
    statuses: [StatusEnum.Active]
  });

  const options = data.map((item: any) => {
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

  const options = data.map((item: any) => {
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
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  const { data, loading } = useRequest(async () => {
    const cacheKey = 'ui-components';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(fetchuiComponentsApi);
    const data = result?.uiComponentList?.uiComponentList;
    setCache(cacheKey, data);
    return data;
  });

  const options = data?.map((item: any) => ({
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
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  const { data, loading } = useRequest(async () => {
    const cacheKey = 'mcp-servers';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(fetchMcpServersApi);
    const data = result.mcpServerList.mcpServerList;
    setCache(cacheKey, data);
    return data;
  });

  const options = data?.map((item: any) => ({
    realData: item,
    label: item.mcpLabel,
    value: item.mcpServerUuid,
  }));

  return { options, loading };
}

// 获取Workflows列表
export const useWorkflowList = (params?: Record<string, any>) => {
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  return useRequest(async () => {
    const cacheKey = `workflow-list-${JSON.stringify(params || {})}`;
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(queryAgentWorkflowsApi, params);
    const data = result?.flowSnippetList?.flowSnippetList || [];
    setCache(cacheKey, data);
    return data;
  });
}

// 获取Workflows
export const useWorkflows = () => {
  const { data, loading } = useWorkflowList({
    statuses: [StatusEnum.Active]
  });

  const options = data?.map((item: any) => ({
    realData: item,
    label: item.flowName,
    value: item.flowSnippetVersionUuid,
  }));

  return { options, loading };
}


// 获取 llm
export const useLlms = () => {
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  const { data, loading } = useRequest(async () => {
    const cacheKey = 'llm-list';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(getLlmListApi);
    const data = result.llmList.llmList as any[];
    setCache(cacheKey, data);
    return data;
  });

  const options = data?.map((item: any) => ({
    realData: item,
    label: item.llmProvider,
    value: item.llmProvider
  }));

  return { options, loading };
}

// 获取 agent 列表
export const useAgentList = (params?: Record<string, any>) => {
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  return useRequest(async () => {
    const cacheKey = `agent-list-${JSON.stringify(params || {})}`;
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(getAgentListApi, params);
    const data = result?.agentList?.agentList as any[];
    setCache(cacheKey, data);
    return data;
  }, {
    refreshDeps: [params ? JSON.stringify(params) : null]
  });
}

export const useAgentOptions = () => {
  const { data = [], loading } = useAgentList({
    statuses: [StatusEnum.Active]
  });

  const options = data.map((item: any) => (
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

  const options = data?.map((e: any) => {
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
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  return useRequest(async () => {
    const cacheKey = 'wizard-list';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(getWizardListApi);
    const data = result.wizardList?.wizardList;
    setCache(cacheKey, data);
    return data;
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
  const setCache = useFetchDataStore(state => state.setCache);
  const getCache = useFetchDataStore(state => state.getCache);
  
  return useRequest(async () => {
    const cacheKey = 'elements-list';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await requestWrapper(getElementsApi);
    const data = result.elementList?.elementList;
    setCache(cacheKey, data);
    return data;
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