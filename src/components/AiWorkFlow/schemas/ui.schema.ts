import type { NodeShemaType } from '../types';
import type { GetShemasParams } from './types';

export const uiSchema = (params: GetShemasParams) => {
  const { uiComponents } = params;

  const valueEnum = uiComponents.reduce((obj, item) => {
    return { ...obj, [item.tag_name]: item.tag_name };
  }, {} as Record<string, any>);

  const formSchema = [
    {
      name: "name",
      valueType: "select",
      title: "Component",
      valueEnum,
      rules: [
        {
          required: true,
          message: "Please select Component",
        }
      ]
    },
    {
      dependencys: [
        // 公共的数据
        {
          name: "name",
          values: Object.keys(valueEnum),
          renders: [
            {
              title: "Text",
              name: "text",
              tooltip: "Description information of the selection component.",
            }
          ]
        },
        ...uiComponents.map(item => {
          return {
            name: 'name',
            values: [item.tag_name],
            renders: item.parameters.map(para => {
              return {
                title: para.name,
                name: para.parameter,
                tooltip: "Description information of the selection component.",
                rules: [
                  {
                    required: true
                  }
                ]
              }
            })
          }
        })
      ]
    }
  ];

  return <NodeShemaType>{
    type: "ui",
    title: "UI",
    icon: "KubernetesOutlined",
    desc: "The UI components within the AI assistant can be used as a data source to obtain data.",
    modalWidth: 420,
    formSchema,
  }
}