export const getUiFormSchema = (uiComponents: API.Workflow.UiComponentType[]) => {
  return [
    {
      valueType: "select",
      title: "Component",
      name: "name",
      rules: [
        {
          required: true,
          message: "Please select Component"
        }
      ],
      "valueEnum": {
        "UploadFile": "Upload File",
        "GooglePlace": "Google Place",
        "QuestionGroup": "Question Group"
      }
    }
  ]
}