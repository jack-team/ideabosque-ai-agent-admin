import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

// 获取workflow 列表
export const queryAgentWorkflows = async (variables: SplitPageParams) => {
  const query = await generateQuery({ name: 'flowSnippetList', type: 'Query' });
  return agentCore.graphql<API.Workflow.QueryWorkflowsResult>({ query, variables });
}

// 获取单个Workflow 详情
export const queryAgentWorkflow = async (variables: Record<string, any>) => {
  const query = await generateQuery({ name: 'flowSnippet', type: 'Query' });
  return agentCore.graphql<API.Workflow.QueryWorkflowResult>({ query, variables });
}

export const insertUpdateA = () => {
  
}