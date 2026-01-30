import { BaseRequest } from '@/request';
import * as env from '@/env';

const baseConfigs = {
  apiKey: env.apiKey,
  partId: env.partId,
  baseUrl: env.apiBaseUrl,
  endpointId: env.endpointId
}

export function getSplitPageParams(params?: SplitPageParams) {
  const { current: pageNumber, pageSize: limit, ...rest } = { ...params };
  return { pageNumber, limit, ...rest };
}

export const apiCore = new BaseRequest(
  'ai_agent_core_graphql',
  baseConfigs
);

export const apiCoordination = new BaseRequest(
  'ai_coordination_graphql',
  baseConfigs
);

export const apiMarketing = new BaseRequest(
  'ai_marketing_graphql', 
  baseConfigs
);


export const mcpCore = new BaseRequest(
  'mcp_core_graphql',
  baseConfigs
);