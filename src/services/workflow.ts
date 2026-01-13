import { apiCore, getSplitPageParams } from '@/utils/api';
import {
  workflowQuery,
  workflowListQuery,
  promptTemplateQuery,
  promptTemplateListQuery,
  insertUpdateWorkflowQuery,
  insertUpdatePromptTemplateQuery
} from '@/graphql/workflow';

import type {
  WorkflowDataType,
  PromptTemplateDataType
} from '@/typings/workflow';

export const workflowListApi = (params: SplitPageParams<{
  statuses?: string[];
  flowSnippetUuid?: string;
}>) => apiCore.graphql<WorkflowDataType[]>({
  query: workflowListQuery,
  variables: getSplitPageParams(params)
});

export const workflowApi = (params: {
  flowSnippetUuid: string;
  flowSnippetVersionUuid: string;
}) => apiCore.graphql<WorkflowDataType>({
  query: workflowQuery,
  variables: params
});

export const promptTemplateListApi = (
  params: SplitPageParams<{
    statuses?: string[];
    promptUuid?: string;
  }>
) => apiCore.graphql<PromptTemplateDataType[]>({
  query: promptTemplateListQuery,
  variables: getSplitPageParams(params)
});

export const promptTemplateDetailApi = (params: {
  promptUuid?: string;
  promptVersionUuid?: string;
}) => apiCore.graphql<PromptTemplateDataType>({
  query: promptTemplateQuery,
  variables: params
});

export const insertUpdateWorkflowApi = (params: Record<string, any>) => {
  return apiCore.graphql<PromptTemplateDataType>({
    query: insertUpdateWorkflowQuery,
    variables: params
  });
}

export const insertUpdatePromptTemplateApi = (params: Record<string, any>) => {
  return apiCore.graphql<PromptTemplateDataType>({
    query: insertUpdatePromptTemplateQuery,
    variables: params
  });
}