import type { UiComponentDataType } from '@/typings/ui';
import type { McpServerDataType, McpServerToolDataType } from '@/typings/mcp';
import type { UiComponentType, ActionFunctionType, OptionType } from '@/components/FlowCanvas/types';

// 获取所有的 UI 组件
export const useUiComponents = (data: UiComponentDataType[] = []) => {
  return data.map<UiComponentType>(item => {
    const type = item.uiComponentType;
    const label = item.tagAlias || item.tagName;
    
    const parameters = [
      ...item.parameters,
      {
        name: 'waitFor',
        parameter: item.waitFor
      }
    ];

    return {
      componentType: type,
      componentName: label,
      componentTag: item.tagName,
      componentId: item.uiComponentUuid,
      input: parameters.map(e => {
        let initialValue = e.parameter;
        if (initialValue) {
          initialValue = `{${initialValue}}`;
        }
        return {
          required: true,
          label: e.name,
          name: e.parameter,
          actionFunc: e.valueListFunct 
        }
      })
    }
  });
}

//获取所有的 tools
export const useActions = (data: McpServerDataType[] = []) => {
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

// 获取所有的转换工具
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