import type { NodeShemaType } from '../types';

export const stepShema = () => {
  return <NodeShemaType>{
    type: "step",
    icon: "StepForwardOutlined",
    title: "Step",
    modalWidth: 420,
    desc: "Execute the corresponding process according to the different branches created.",
    formSchema: [
      {
        title: "Name",
        name: "name",
        rules: [
          {
            required: true,
          },
        ],
      },
      {
        title: "Description",
        name: "description",
        rules: [
          {
            required: true,
          },
        ],
      },
      {
        name: "conditions",
        valueType: "formList",
        fieldProps: {
          creatorButtonProps: {
            creatorButtonText: "Add condition",
          },
        },
        columns: [
          {
            valueType: "group",
            columns: [
              {
                title: "Condition",
                name: "condition",
                fieldProps: {
                  placeholder: "Please enter a condition",
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