import { useRequest } from 'ahooks';
import type { UiComponentDataType } from '@/typings/ui';
import { wizardGroupListApi } from '@/services/wizardGroup';
import { ComponentType } from '@/pages/uiComponent/list/enmu';
import type { McpServerDataType, McpServerToolDataType } from '@/typings/mcp';
import type { UiComponentType, ActionFunctionType, OptionType, ElementResultOptionType } from '@/components/FlowCanvas/types';

export const useUiComponents = (data: UiComponentDataType[] = []) => {
  const { data: wizards } = useRequest(async () => {
    const result = await wizardGroupListApi({});
    return result.data.map(item => {
      return {
        id: item.wizardGroupUuid,
        value: item.wizardGroupUuid,
        label: item.wizardGroupName
      }
    });
  });

  return data.map<UiComponentType>(item => {
    const type = item.uiComponentType;

    const parameters = [
      ...item.parameters,
      {
        name: 'waitFor',
        parameter: item.waitFor
      }
    ];

    return {
      componentType: type,
      componentName: item.tagName,
      componentTag: item.tagName,
      componentId: item.uiComponentUuid,

      input: parameters.map(e => {
        let initialValue = e.parameter;

        if (initialValue) {
          initialValue = `{${initialValue}}`;
        }

        const obj: ElementResultOptionType = {
          required: true,
          label: e.name,
          name: e.parameter
        }

        if (type === ComponentType.wizardGroup) {
          if (e.parameter === 'wizard_group_uuid') {
            obj.options = wizards;
          }
        } else {
          obj.initialValue = initialValue;
        }

        return obj;
      })
    }
  });
}

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