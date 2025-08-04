import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';
import { getAgentListQl } from '@/qls/agent';

export const getAgentListApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: getAgentListQl,
    variables: params
  });
}

export const insertUpdateAgentApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'insertUpdateAgent' });
  return agentCore.graphql({ query, variables: params });
}