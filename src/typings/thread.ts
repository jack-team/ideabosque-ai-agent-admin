import type { AgentDataType } from './agent';

export type ThreadDataType = {
  agentUuid: string;
  threadUuid: string;
  createdAt: string;
  userId: string;
  messages: any[];
  agent: AgentDataType;
  toolCalls: any[];
}