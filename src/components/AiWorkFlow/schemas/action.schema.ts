import type { NodeShemaType } from '../types';
import type { GetShemasParams } from './types';

export const actionSchema = (params: GetShemasParams) => {
  const { mcpServers } = params;

  const tools = mcpServers.reduce((pre, item) => {
    return [...pre, ...item.tools];
  }, [] as API.Workflow.McpServerTool[])

  const valueEnum = tools.reduce((obj, item) => {
    return { ...obj, [item.name]: item.description };
  }, {} as Record<string, any>);

  return <NodeShemaType>{
    type: "action",
    icon: "FunctionOutlined",
    title: "Action",
    modalWidth: 420,
    desc: "Obtain or process data by calling backend interfaces or methods.",
    formSchema: [
      {
        title: "Type",
        name: "type",
        valueType: 'select',
        valueEnum,
        rules: [
          {
            required: true,
          },
        ],
      },
      {
        title: "Text",
        name: "text",
        rules: [
          {
            required: true,
          },
        ],
      },
    ],
  }
}