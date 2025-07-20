declare namespace API {
  namespace Workflow {
    type FlowSnippet = {
      flowName: string;
      flowSnippetUuid: string;
      flowSnippetVersionUuid: string;
      status: string;
      updatedAt: string;
      updatedBy: string;
      flowRelationship: string;
      flowContext: string;
      createdAt: string;
    };

    type McpServerTool = {
      name: string;
      description: string;
      input_schema: Record<string, any>;
    };

    type UiComponentType = {
      ui_component_uuid: string;
      ui_component_type: string;
      tag_name: string;
      wait_for: string;
      parameters: Array<{
        name: string;
        parameter: string;
      }>;
      createdAt: string;
      updatedAt: string;
      tagName: string;
      uiComponentType: string;
      uiComponentUuid: string;
      updatedBy: string;
      waitFor: string;
    };

    type McpServerItem = {
      mcp_server_uuid: string;
      mcp_label: string;
      mcp_server_url: string;
      tools: McpServerTool[];
      updatedAt: string;
      createdAt: string;
      endpointId: string;
      updatedBy: string;
      headers: Record<string, any>;
      mcpLabel: string;
      mcpServerUrl: string;
      mcpServerUuid: string;
    };

    type PromptTemplateItem = {
      createdAt: string;
      endpointId: string;
      promptDescription: string;
      promptName: string;
      promptType: string;
      promptUuid: string;
      promptVersionUuid: string;
      status: string;
      templateContext: string;
      updatedAt: string;
      updatedBy: string;
      variables: any[];
      mcpServers: McpServerItem[];
      uiComponents: UiComponentType[];
    };

    type QueryWorkflowsResult = SplitPageResult<"flowSnippetList", FlowSnippet>;

    type QueryWorkflowResult = {
      flowSnippet: FlowSnippet;
    };

    type InsertUpdateWorkflowResult = {
      insertUpdateFlowSnippet: {
        flowSnippet: FlowSnippet;
      };
    };

    type QueryAgentWorkflowTemplatesResult = SplitPageResult<
      "promptTemplateList",
      PromptTemplateItem
    >;

    type InsertUpdatePromptTemplateResult = {
      insertUpdatePromptTemplate: {
        promptTemplate: PromptTemplateItem;
      };
    };

    type FetchWorkflowTemplateDetailResult = {
      promptTemplate: PromptTemplateItem;
    };

    type FetchMcpServersResult = SplitPageResult<
      "mcpServerList",
      McpServerItem
    >;

    type FetchuiComponentsResult = SplitPageResult<
      "uiComponentList",
      UiComponentType
    >;

    type InsetUpdateUiComponentResult = {
      insertUpdateUiComponent: {
        uiComponent: UiComponentType;
      };
    };
  }
}
