import { agentBuild } from '@/helper/request';

// 生成 Query
export const generateQuery = async (params: GenerateQueryParams) => {
  const result = await agentBuild.send<GenerateQueryResult>({
    operation_name: params.name,
    operation_type: params.type,
    function_name: 'ai_agent_core_graphql'
  });
  return result.query;
}