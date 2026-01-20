import type { AgentDataType } from './agent';

export type ThreadMessageDataType = {
  createdAt: string;
  message: {
    content: string;
    role: 'user' | 'assistant';
    run: {
      completionTokens: number;
      promptTokens: number;
      runUuid: string;
      totalTokens: number;
    }
  }
}

export type ThreadDataType = {
  agentUuid: string;
  threadUuid: string;
  createdAt: string;
  userId: string;
  messages: ThreadMessageDataType[];
  agent: AgentDataType;
  toolCalls: any[];
}