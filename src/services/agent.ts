import { agentCore } from '@/helper/request';
import { getAgentListQl, insertUpdateAgentQl } from '@/qls/agent';

export const getAgentListApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: getAgentListQl,
    variables: params
  });
}

export const insertUpdateAgentApi = (params: Record<string, any>) => {
  return agentCore.graphql({
    query: insertUpdateAgentQl,
    variables: params
  });
}