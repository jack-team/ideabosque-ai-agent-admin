import type { UiComponentType, ActionFunctionType, OptionType } from "@/components/FlowCanvas/types";
import type { UiComponentDataType } from '@/typings/ui';
import type { McpServerDataType, McpServerToolDataType } from '@/typings/mcp';

export const useUiComponents = (data: UiComponentDataType[]) => {
  return data.map<UiComponentType>(item => {

    const parameters = [
      ...item.parameters,
      {
        name: 'waitFor',
        parameter: item.waitFor
      }
    ];

    return {
      componentName: item.tagName,
      componentTag: item.tagName,
      componentId: item.uiComponentUuid,
      componentType: item.uiComponentType,
      input: parameters.map(item => {
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

export const useActions = (data: McpServerDataType[]) => {
  const tools = data.reduce((pre, current) => {
    return [...pre, ...current?.tools || []];
  }, [] as McpServerToolDataType[]);

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
      value: 'summarize',
      maxAttrs: 1
    },
    {
      label: 'Full content',
      value: 'full_content',
      maxAttrs: 1
    },
    {
      label: 'Structure input',
      value: 'structure_input',
      subValue: 'data_collect_dataset'
    }
  ];
}