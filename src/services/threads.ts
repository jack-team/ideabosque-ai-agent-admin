import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

export const getThreadListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'threadList' });
  return agentCore.graphql({ query, variables: params });
}