import { useLoadMore } from './useLoadMore';
import { queryAgentWorkflowTemplatesApi, fetchuiComponentsApi, fetchMcpServersApi } from '@/services/workflow';

export const useWorkFlowTemplates = () => {
  const {
    records,
    loading
  } = useLoadMore<API.Workflow.PromptTemplateItem>(async () => {
    const {
      promptTemplateList: result
    } = await queryAgentWorkflowTemplatesApi({
      pageNumber: 1,
      limit: 1000
    });

    return {
      data: result.promptTemplateList
    }
  });

  const options = records.map(item => (
    {
      label: item.promptName,
      value: item.promptUuid,
      realData: item,
    }
  ));

  return { loading, options }
}

export const useUiComponents = () => {
  const {
    records,
    loading
  } = useLoadMore<API.Workflow.UiComponentType>(async () => {
    const {
      uiComponentList: result
    } = await fetchuiComponentsApi({
      pageNumber: 1,
      limit: 1000
    });
    return {
      data: result.uiComponentList
    };
  });

  const options = records.map(item => {
    return {
      label: item.tagName,
      value: [
        item.uiComponentUuid,
        item.uiComponentType
      ].join('__'),
      realData: item,
    }
  });

  return { loading, options };
}

export const useMcpServers = () => {
  const {
    records,
    loading
  } = useLoadMore<API.Workflow.McpServerItem>(async () => {
    const {
      mcpServerList: result
    } = await fetchMcpServersApi({
      pageNumber: 1,
      limit: 1000
    });
    return {
      data: result.mcpServerList
    }
  });

  const options = records.map(item => (
    {
      realData: item,
      label: item.mcpLabel,
      value: item.mcpServerUuid,
    }
  ));

  return { options, loading };
}