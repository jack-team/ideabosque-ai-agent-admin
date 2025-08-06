import { aiMarketing } from '@/helper/request';
import { generateAiMarketingQuery } from './generate';

export const getQuestionGroupListApi = async (params: Record<string, any>) => {
  const query = await generateAiMarketingQuery({ type: 'Query', name: 'questionGroupList' });
  return aiMarketing.graphql({ query, variables: params });
}

export const insertUpdateQuestionGroupApi = async (params: Record<string, any>) => {
  const query = await generateAiMarketingQuery({ type: 'Mutation', name: 'insertUpdateQuestionGroup' });
  return aiMarketing.graphql({ query, variables: params });
}