import type { NodeShemaType } from '../types';

export const transformSchema = () => {

  const valueEnum = {
    summarize: 'summarize',
    full_content: 'full_content',
    structure_input: 'structure_input'
  }

  return <NodeShemaType>{
    type: "transform",
    icon: "BlockOutlined",
    title: "Transform",
    modalWidth: 420,
    desc: "Convert the input data",
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
        name: "attrs",
        valueType: "formList",
        fieldProps: {
          creatorButtonProps: {
            creatorButtonText: "Add attr",
          },
        },
        columns: [
          {
            valueType: "group",
            columns: [
              {
                title: "Attribute",
                name: "attr",
                fieldProps: {
                  placeholder: "Please enter a Attribute",
                },
                width: "md",
                rules: [
                  {
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
}