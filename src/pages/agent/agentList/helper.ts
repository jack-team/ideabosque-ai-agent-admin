import type { AgentDataType } from '@/typings/agent';

/**
 * 将 Agent 详情转换为表单数据
*/
export const agentRecordTransformFormData = (agent: AgentDataType) => {
  const { mcpServers, llm, flowSnippet, ...rest } = agent;
  return { ...llm, ...rest };
}