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