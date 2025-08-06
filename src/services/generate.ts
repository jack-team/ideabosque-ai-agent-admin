import { agentBuild } from '@/helper/request';

export const generate = async (funcName: string, params: GenerateQueryParams) => {
  const result = await agentBuild.send<GenerateQueryResult>({
    function_name: funcName,
    operation_name: params.name,
    operation_type: params.type
  });
  return result.query;
}

// 生成 Query
export const generateQuery = async (params: GenerateQueryParams) => {
  return generate('ai_agent_core_graphql', params);
}

export const generateAiMarketingQuery = (params: GenerateQueryParams) => {
  return generate('ai_marketing_graphql', params);
}

export const generateAiCoordinationQuery = (params: GenerateQueryParams) => {
  return generate('ai_coordination_graphql', params);
}