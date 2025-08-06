import { agentCore } from '@/helper/request';
import { generateQuery } from './generate';

export const getWizardGroupListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'wizardGroupList' });
  return agentCore.graphql({ query, variables: params });
}

export const getWizardListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'wizardList' });
  return agentCore.graphql({ query, variables: params });
}

export const insertUpdateWizardGroupApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'insertUpdateWizardGroup' });
  return agentCore.graphql({ query, variables: params });
}

export const deleteWizardGroupApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'deleteWizardGroup' });
  return agentCore.graphql({ query, variables: params });
}