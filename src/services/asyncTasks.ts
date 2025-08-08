import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

export const getAsyncTaskListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'asyncTaskList' });
  return agentCore.graphql({ query, variables: params });
}