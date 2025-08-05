const splitTag = '__';

export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) {
    return;
  }

  const {
    llm,
    flowSnippet,
    agentVersionUuid,
    ...rest
  } = record;

  return {
    ...rest,
    llmName: llm?.llm_name,
    llmProvider: llm?.llm_provider,
    flowSnippet: [
      flowSnippet?.flow_snippet_uuid,
      flowSnippet?.flow_snippet_version_uuid
    ].filter(v => v).join(splitTag)
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