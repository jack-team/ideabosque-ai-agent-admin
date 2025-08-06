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

export const getElementsApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'elementList' });
  return agentCore.graphql({ query, variables: params });
}

export const insertUpdateWizardApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'insertUpdateWizard' });
  return agentCore.graphql({ query, variables: params });
}

export const deleteWizardApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'deleteWizard' });
  return agentCore.graphql({ query, variables: params });
}

export const deleteElementApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'deleteElement' });
  return agentCore.graphql({ query, variables: params });
}

export const insertUpdateElementApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Mutation', name: 'insertUpdateElement' });
  return agentCore.graphql({ query, variables: params });
}