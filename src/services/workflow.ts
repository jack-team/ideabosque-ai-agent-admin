import { agentCore } from "@/helper/request";
import { generateQuery } from "./generate";

// 获取 workflow 模板列表
export const queryAgentWorkflowTemplatesApi = async (
  variables: SplitPageParams
) => {
  const query = await generateQuery({
    type: "Query",
    name: "promptTemplateList",
  });
  return agentCore.graphql<API.Workflow.QueryAgentWorkflowTemplatesResult>({
    query,
    variables,
  });
};

// 创建一个 workflow模板
export const insertUpdatePromptTemplateApi = async (
  variables: Record<string, any>
) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "insertUpdatePromptTemplate",
  });
  return agentCore.graphql<API.Workflow.InsertUpdatePromptTemplateResult>({
    query,
    variables,
  });
};

// 获取单个模板信息
export const fetchWorkflowTemplateDetailApi = async (
  variables: Record<string, any>
) => {
  const query = await generateQuery({
    type: "Query",
    name: "promptTemplate",
  });
  return agentCore.graphql<API.Workflow.FetchWorkflowTemplateDetailResult>({
    query,
    variables,
  });
};

// 获取workflow 列表
export const queryAgentWorkflowsApi = async (variables: SplitPageParams) => {
  const query = await generateQuery({
    type: "Query",
    name: "flowSnippetList",
  });
  return agentCore.graphql<API.Workflow.QueryWorkflowsResult>({
    query,
    variables,
  });
};

// 获取单个Workflow 详情
export const queryAgentWorkflowApi = async (variables: Record<string, any>) => {
  const query = await generateQuery({
    type: "Query",
    name: "flowSnippet",
  });
  return agentCore.graphql<{ flowSnippet: API.Workflow.FlowSnippet }>({
    query,
    variables,
  });
};

// 新建或者更新
export const insertUpdateWorkflowApi = async (
  variables: Partial<API.Workflow.FlowSnippet>
) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "insertUpdateFlowSnippet",
  });
  return agentCore.graphql({ query, variables });
};

// 删除
export const deleteFlowSnippetApi = async (
  variables: Pick<API.Workflow.FlowSnippet, "flowSnippetVersionUuid">
) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "deleteFlowSnippet",
  });
  return agentCore.graphql({ query, variables });
};

// 获取 mcp servers
export const fetchMcpServersApi = async (variables: SplitPageParams) => {
  const query = await generateQuery({
    type: "Query",
    name: "mcpServerList",
  });
  return agentCore.graphql<API.Workflow.FetchMcpServersResult>({
    query,
    variables,
  });
};

// 新建编辑 mcpServer
export const insertUpdateMcpServerApi = async (
  variables: Record<string, any>
) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "insertUpdateMcpServer",
  });
  return agentCore.graphql<API.Workflow.InsertUpdateMcpServerResult>({
    query,
    variables,
  });
};

// 获取 uiComponents
export const fetchuiComponentsApi = async (variables: SplitPageParams) => {
  const query = await generateQuery({
    type: "Query",
    name: "uiComponentList",
  });
  return agentCore.graphql<API.Workflow.FetchuiComponentsResult>({
    query,
    variables,
  });
};

// 新增或者编辑组建
export const insetUpdateUiComponentApi = async (
  variables: Record<string, any>
) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "insertUpdateUiComponent",
  });
  return agentCore.graphql<API.Workflow.InsetUpdateUiComponentResult>({
    query,
    variables,
  });
};

// 删除一个组建
export const deleteUiComponentApi = async (variables: Record<string, any>) => {
  const query = await generateQuery({
    type: "Mutation",
    name: "deleteUiComponent",
  });
  return agentCore.graphql({
    query,
    variables,
  });
};
