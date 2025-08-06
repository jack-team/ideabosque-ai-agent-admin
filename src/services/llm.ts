import { agentCore } from '@/helper/request';
import { generateQuery } from '@/services/generate';

// 获取 llm 列表
export const getLlmListApi = async (params: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'llmList'})
  return agentCore.graphql({
    query: query,
    variables: params
  });
}