import { apiCore, getSplitPageParams } from '@/utils/api';
import { llmListQuery } from '@/graphql/llm';
import type { LLMDataType } from '@/typings/llm';

export const llmListApi = (params: SplitPageParams) => {
  return apiCore.graphql<LLMDataType[]>({
    query: llmListQuery,
    variables: getSplitPageParams(params)
  });
}