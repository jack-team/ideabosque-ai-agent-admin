import type { NodeShemaType } from '../types';

export const transformSchema = () => {
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