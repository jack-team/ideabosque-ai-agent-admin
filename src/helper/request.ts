import GraphqlRequest from '@/libs/graphql';

export const agentBuild = new GraphqlRequest({
  namespace: 'ai_agent_build_graphql_query'
});

export const agentCore = new GraphqlRequest({
  namespace: 'ai_agent_core_graphql'
});

export const aiMarketing = new GraphqlRequest({
  namespace: 'ai_marketing_graphql'
});
