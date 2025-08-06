import {
  aiMarketing,
  aiCoordination
} from '@/helper/request';
import {
  generateAiMarketingQuery,
  generateAiCoordinationQuery
} from './generate';

export const getContactProfileListApi = async (params: Record<string, any>) => {
  const query = await generateAiMarketingQuery({ type: 'Query', name: 'contactProfileList' });
  return aiMarketing.graphql({ query, variables: params });
}

export const getPlacesApi = async (params: Record<string, any>) => {
  const query = await generateAiMarketingQuery({ type: 'Query', name: 'placeList' });
  return aiMarketing.graphql({ query, variables: params });
}

export const getContactRequestsApi = async (params: Record<string, any>) => {
  const query = await generateAiMarketingQuery({ type: 'Query', name: 'contactRequestList' });
  return aiMarketing.graphql({ query, variables: params });
}

export const getCoordinationsApi = async (params: Record<string, any>) => {
  const query = await generateAiCoordinationQuery({ type: 'Query', name: 'coordinationList' });
  return aiCoordination.graphql({ query, variables: params });
}

export const insertUpdateCoordinationApi = async (params: Record<string, any>) => {
  const query = await generateAiCoordinationQuery({ type: 'Mutation', name: 'insertUpdateCoordination' });
  return aiCoordination.graphql({ query, variables: params });
}

export const deleteCoordinationApi = async (params: Record<string, any>) => {
  const query = await generateAiCoordinationQuery({ type: 'Mutation', name: 'deleteCoordination' });
  return aiCoordination.graphql({ query, variables: params });
}