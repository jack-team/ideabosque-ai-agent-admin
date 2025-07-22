import type { NodeShemaType } from '../types';

export const branchSchema = () => {
  return <NodeShemaType>{
    type: "branch",
    icon: "BranchesOutlined",
    title: "Branch",
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
        title: "Text",
        name: "text",
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