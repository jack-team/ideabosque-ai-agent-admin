import { agentCore } from '@/helper/request';
import {
  deleteLlmQl,
  queryLlmQl,
  getLlmListQl,
  insertUpdateLlmQl
} from '@/qls/llm';

// 获取 llm 列表
export const getLlmListApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: getLlmListQl,
    variables: params
  });
}

// 更新或者新增 llm
export const insertUpdateLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: insertUpdateLlmQl,
    variables: params
  });
}

// 删除 llm
export const deleteLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: deleteLlmQl,
    variables: params
  });
}

// 获取 llm 列表
export const queryLlmApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: queryLlmQl,
    variables: params
  });
}