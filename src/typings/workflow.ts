import type { StatusType } from './common';
import type { McpServerDataType } from './mcp';
import type { UiComponentDataType } from './ui';

export type WorkflowDataType = {
  flowName: string;
  promptUuid: string;
  flowSnippetUuid: string;
  flowSnippetVersionUuid: string;
  status: StatusType;
  updatedAt: string;
  createdAt: string;
  flowRelationship: string;
  flowContext: string;
  promptTemplate: PromptTemplateDataType;
}

export type VariableType = {
  name: string;
  dataType: string;
}

export type PromptTemplateDataType = {
  createdAt: string;
  mcpServers: McpServerDataType[];
  promptDescription: string;
  promptName: string;
  promptType: string;
  promptUuid: string;
  promptVersionUuid: string;
  status: StatusType;
  templateContext: string;
  uiComponents: UiComponentDataType[];
  variables: VariableType[];
}