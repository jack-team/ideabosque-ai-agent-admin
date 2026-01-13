import type { StatusType } from './common';
import type { WorkflowDataType } from './workflow';
import type { LLMDataType } from './llm';
import type { McpServerDataType } from './mcp';

export type AgentDataType = {
  agentUuid: string;
  agentName: string;
  agentDescription: string;
  agentVersionUuid: string;
  createdAt: string;
  status: StatusType;
  agentType: string;
  updatedAt: string;
  configuration: Record<string, any>;
  flowSnippet: WorkflowDataType | null;
  llm: LLMDataType | null;
  mcpServers: McpServerDataType[];
  flowSnippetVersionUuid: string;
  mcpServerUuids: string[];
  numOfMessages: number;
  toolCallRole: string;
}

export type CoordinationDataType = {
  coordinationUuid: string;
  coordinationName: string;
  coordinationDescription: string;
  createdAt: string;
  endpointId: string;
  updatedAt: string;
  updatedBy: string;
  agents: AgentDataType[];
}