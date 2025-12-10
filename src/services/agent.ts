import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

export const getAgentListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'agentList' });
  return agentCore.graphql({ query, variables: params });
}

export const insertUpdateAgentApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'insertUpdateAgent' });
  return agentCore.graphql({ query, variables: params });
}

export const getCoordinationListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'coordinationList' });
  return agentCore.graphql({ query, variables: params });
}

export const getAgentDetailApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'agent' });
  return agentCore.graphql({ query, variables: params });
}