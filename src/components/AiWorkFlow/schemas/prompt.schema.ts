import type { NodeShemaType } from '../types';

export const PromptShema = () => {
  return <NodeShemaType>{
    type: "prompt",
    title: "Prompt",
    icon: "SendOutlined",
    modalWidth: 420,
    desc: "Prompt the AI what to do or say.",
    formSchema: [
      {
        title: "Type",
        name: "type",
        valueType: "radio",
        valueEnum: {
          prompt: "Prompt",
          text: "Text",
        },
        initialValue: "prompt",
        rules: [
          {
            required: true,
          },
        ],
      },
      {
        dependencys: [
          {
            name: "type",
            values: ["text"],
            renders: [
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
          },
          {
            name: "type",
            values: ["prompt"],
            renders: [
              {
                title: "Prompt",
                name: "prompt",
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