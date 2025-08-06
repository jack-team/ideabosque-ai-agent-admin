const splitTag = '__';

export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) return;

  const {
    llm,
    flowSnippet,
    mcpServers,
    agentVersionUuid,
    ...rest
  } = record;

  const workFlowId = [
    flowSnippet?.flow_snippet_uuid,
    flowSnippet?.flow_snippet_version_uuid
  ].filter(v => v).join(splitTag);

  const mcpServerUuids = mcpServers.map((item: any) => {
    return item.mcp_server_uuid;
  });

  return {
    ...rest,
    mcpServerUuids,
    flowSnippet: workFlowId,
    llmName: llm?.llm_name,
    llmProvider: llm?.llm_provider,
    configurationSchema: llm?.configuration_schema,
  }
}

export const formDataToParams = (formData: Record<string, any>) => {
  const { flowSnippet, ...reset } = formData;
  const [, flowSnippetVersionUuid] = flowSnippet.split(splitTag);

  return {
    ...reset,
    flowSnippetVersionUuid,
    updatedBy: 'Admin'
  }
}