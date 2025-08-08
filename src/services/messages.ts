import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

export const getMessageListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'messageList' });
  return agentCore.graphql({ query, variables: params });
}