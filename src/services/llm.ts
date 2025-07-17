import { agentCore } from '@/helper/request';
import { getLlmListQl, insertUpdateLlmQl, deleteLlmQl, queryLlmQl } from '@/qls/llm';

export const getLlmListApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: getLlmListQl,
    variables: params
  });
}

export const insertUpdateLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: insertUpdateLlmQl,
    variables: params
  });
}

export const deleteLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: deleteLlmQl,
    variables: params
  });
}

export const queryLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: queryLlmQl,
    variables: params
  });
}