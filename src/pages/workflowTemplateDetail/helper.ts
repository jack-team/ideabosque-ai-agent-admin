export const splitTag = '__';

export const dateTransformFormData = (data: API.Workflow.PromptTemplateItem) => {

  const mcpServers = data.mcpServers.map(e => {
    return e.mcp_server_uuid;
  });

  const uiComponents = data.uiComponents.map(e => {
    return [e.ui_component_uuid, e.ui_component_type].join(splitTag);
  });

  return { ...data, mcpServers, uiComponents }
}

export const formDataTransformRequestParams = (formData: Record<string, any>) => {
  const mcps = (formData.mcpServers || []) as string[];
  const uis = (formData.uiComponents || []) as string[];

  const mcpServers = mcps.map(id => {
    return { mcp_server_uuid: id };
  });

  const uiComponents = uis.map(id => {
    const [ui_component_uuid, ui_component_type] = id.split(splitTag)
    return { ui_component_uuid, ui_component_type };
  });

  return { ...formData, mcpServers, uiComponents, updatedBy: 'admin' }
}