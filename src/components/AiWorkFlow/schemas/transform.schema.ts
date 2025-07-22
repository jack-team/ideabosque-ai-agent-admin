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
        title: "Value",
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