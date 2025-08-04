export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) {
    return;
  }

  const { llm } = record;

  return {
    ...record,
    llmName: llm?.llm_name,
    llmProvider: llm?.llm_provider
  }
}