import type { NodeShemaType } from "../types";

export type GetShemasParams = {
  mcpServers: API.Workflow.McpServerItem[];
  uiComponents: API.Workflow.UiComponentType[];
};

export type GetShemasFn = (params: GetShemasParams) => NodeShemaType;
