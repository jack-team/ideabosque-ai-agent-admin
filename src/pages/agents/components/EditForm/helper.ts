export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) {
    return;
  }

  const {
    llm,
    flowSnippet,
    mcpServers,
    promptTemplate,
    agentVersionUuid,
    ...rest
  } = record;

  const variables = promptTemplate?.variables || [];
  const workFlowId = flowSnippet?.flow_snippet_version_uuid;

  const mcpServerUuids = mcpServers.map(
    (item: Record<string, any>) => {
      return item.mcp_server_uuid;
    }
  ).filter((v: string) => v);

  const variableOptions = variables.map(
    (item: Record<string, any>) => ({
      label: item.name,
      value: item.name,
    })
  );

  return {
    ...rest,
    promptTemplate,
    mcpServerUuids,
    variableOptions,
    llmName: llm?.llm_name,
    flowSnippet: workFlowId,
    llmProvider: llm?.llm_provider,
    configurationSchema: llm?.configuration_schema,
  }
}

export const formDataToParams = (formData: Record<string, any>) => {
  const { flowSnippet, ...reset } = formData;

  return {
    ...reset,
    flowSnippetVersionUuid: flowSnippet,
    updatedBy: 'Admin'
  }
}