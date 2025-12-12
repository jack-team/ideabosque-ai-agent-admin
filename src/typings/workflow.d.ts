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
      promptTemplate: PromptTemplateItem;
      promptUuid?: string;
      duplicate?: boolean;
    };

    type McpServerTool = {
      name: string;
      description: string;
      input_schema: {
        required: string;
        type: string;
        properties: Record<string, {
          type: string;
        }>
      };
    };

    type UiComponentType = {
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
      // 下划线
      ui_component_uuid: string;
      ui_component_type: string;
      tag_name: string;
      wait_for: string;
    };

    type McpServerItem = {
      tools: McpServerTool[];
      updatedAt: string;
      createdAt: string;
      endpointId: string;
      updatedBy: string;
      headers: Record<string, any>;
      mcpLabel: string;
      mcpServerUrl: string;
      mcpServerUuid: string;

      // 下划线
      mcp_server_uuid: string;
      mcp_label: string;
      mcp_server_url: string;
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
      createAt: string;
      updatedBy: string;
      variables: any[];
      mcpServers: McpServerItem[];
      uiComponents: UiComponentType[];
      // 下划线
      mcp_servers: McpServerItem[];
      ui_components: UiComponentType[];
      prompt_uuid: string;
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

    type InsertUpdateMcpServerResult = {
      insertUpdateMcpServer: {
        mcpServer: McpServerItem;
      }
    }
  }
}
