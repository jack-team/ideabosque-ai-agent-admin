import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

// 获取workflow 列表
export const queryAgentWorkflowsApi = async (variables: SplitPageParams) => {
  const query = await generateQuery({ name: 'flowSnippetList', type: 'Query' });
  return agentCore.graphql<API.Workflow.QueryWorkflowsResult>({ query, variables });
}

// 获取单个Workflow 详情
export const queryAgentWorkflowApi = async (variables: Record<string, any>) => {
  const query = await generateQuery({ name: 'flowSnippet', type: 'Query' });
  return agentCore.graphql<API.Workflow.QueryWorkflowResult>({ query, variables });
}

// 新建或者更新
export const insertUpdateWorkflowApi = async (variables: Partial<API.Workflow.FlowSnippet>) => {
  const query = await generateQuery({ name: 'insertUpdateFlowSnippet', type: 'Mutation' });
  return agentCore.graphql<API.Workflow.InsertUpdateWorkflowResult>({ query, variables });
}