import { agentCore, aiMarketing } from '@/helper/request';
import { generateQuery } from './generate';
import { getPlaceListQl } from '@/qls/place';

export const getContactProfileListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'contactProfileList' });
  return agentCore.graphql({ query, variables: params });
}

export const getPlacesApi = (params: Record<string, any>) => {
  return aiMarketing.graphql({ query: getPlaceListQl, variables: params });
}