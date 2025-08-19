import type { UiComponentType, ActionFunctionType, OptionType } from "@/components/FlowCanvas/types";

export const useUiComponents = (data: API.Workflow.UiComponentType[]) => {
  return data.map<UiComponentType>(item => {
    return {
      componentName: item.tag_name,
      componentTag: item.tag_name,
      componentId: item.ui_component_uuid,
      componentType: item.ui_component_type,
      input: item.parameters.map(item => {
        let initialValue = item.parameter;
        if (initialValue) {
          initialValue = `{${initialValue}}`;
        }
        return {
          required: true,
          label: item.name,
          name: item.name,
          initialValue
        }
      })
    }
  });
}

export const useActions = (data: API.Workflow.McpServerItem[]) => {
  const tools = data.reduce((pre, current) => {
    return [...pre, ...current.tools];
  }, [] as API.Workflow.McpServerTool[]);

  return tools.map<ActionFunctionType>(item => {
    return {
      name: item.name,
      description: item.description
    }
  });
}

export const useTransformTools = () => {
  return <OptionType[]>[
    {
      label: 'Summarize',
      value: 'summarize'
    },
    {
      label: 'Full content',
      value: 'full_content'
    },
    {
      label: 'Structure input',
      value: 'structure_input',
      subValue: 'data_collect_dataset'
    }
  ];
}