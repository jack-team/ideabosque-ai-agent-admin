export type FormData = {
  agents: string[];
  coordinationName: string;
  coordinationDescription: string;
}

export type AgentOption = {
  label: string;
  value: string;
  realData: Record<string, any>;
}

export const recordToFromData = (record?: Record<string, any>) => {
  if (!record) return;

  const { agents = [], ...rest } = record;
  return {
    ...rest,
    agents: agents.map((e: any) => e.agent_uuid)
  }
}

export const formDataTransfromParams = (formData: FormData, options: AgentOption[]) => {
  const { agents = [], ...rest } = formData;

  const agentList = agents.map(id => {
    const real = options.find(e => {
      return e.value === id;
    })?.realData;

    return {
      agent_uuid: id,
      agent_type: 'task',
      agent_name: real?.agentName,
      agent_description: real?.agentDescription
    }
  });

  return {
    ...rest,
    agents: agentList,
    updatedBy: 'Admin'
  }
}