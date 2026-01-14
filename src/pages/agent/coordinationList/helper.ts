import type { CoordinationDataType, AgentDataType } from '@/typings/agent';

export const coordinationTransformFormData = (coordination: CoordinationDataType) => {
  const { agents, ...rest } = coordination;
  
  return {
    ...rest,
    agentUuids: agents.map(e => e.agentUuid)
  };
}

type ParamsType = {
  agentUuids: string[];
  [key: string]: any;
}

export const formDataTransfromParams = (
  params: ParamsType, 
  agentList: AgentDataType[] = []
) => {
  const { agentUuids, ...rest } = params;

  const agents = agentUuids.map(uuid => {
    const agent = agentList.find(e => e.agentUuid === uuid);
    if (agent) {
      return {
        agentName: agent.agentName,
        agentUuid: agent.agentUuid,
        agentDescription: agent.agentDescription
      }
    }
  }).filter(v => v);

  return {
    ...rest,
    agents,
    updatedBy: 'Admin'
  };
}

export function renderTemplate(template: string, options: Record<string, any>) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    // 如果 options 中有这个 key，则替换，否则保留原占位符
    return options.hasOwnProperty(key) ? (options[key] || '') : match;
  });
}