import { agentCore } from '@/helper/request';
import {
  deleteFlowSnippetQl,
  queryFlowSnippetListQl,
  queryFlowSnippetQl,
  insertUpdateFlowSnippetQl
} from '@/qls/workflow';

// 获取workflow 列表
export const queryAgentWorkflowsApi = (variables: SplitPageParams) => {
  return agentCore.graphql({ query: queryFlowSnippetListQl, variables });
}

// 获取单个Workflow 详情
export const queryAgentWorkflowApi = (variables: Record<string, any>) => {
  return agentCore.graphql({ query: queryFlowSnippetQl, variables });
}

// 新建或者更新
export const insertUpdateWorkflowApi = (variables: Partial<API.Workflow.FlowSnippet>) => {
  return agentCore.graphql({ query: insertUpdateFlowSnippetQl, variables });
}

// 删除
export const deleteFlowSnippetApi = (variables: Pick<API.Workflow.FlowSnippet, 'flowSnippetVersionUuid'>) => {
  return agentCore.graphql({ query: deleteFlowSnippetQl, variables });
}