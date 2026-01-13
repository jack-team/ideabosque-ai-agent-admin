export type McpServerDataType = {
  createdAt: string;
  updatedAt: string;
  headers: Record<string, any>;
  mcpLabel: string;
  tools: McpServerToolDataType[];
  mcpServerUrl: string;
  mcpServerUuid: string;
}

export type McpServerToolDataType = {
  description: string;
  name: string;
  inputSchema: Record<string, any>;
}