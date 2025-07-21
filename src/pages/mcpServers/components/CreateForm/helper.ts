type HeaderItemType = {
  key: string;
  value: any;
};

export const dataTransformFormData = (data: API.Workflow.McpServerItem) => {
  const { tools, headers, ...reset } = data;

  const headerList = Object.keys(headers).reduce((arr, key: string) => {
    return [...arr, { key, value: headers[key] }];
  }, [] as HeaderItemType[]);

  return {
    ...reset,
    headers: headerList,
  };
};

export const formDataTransformRequestParams = (
  formData: ReturnType<typeof dataTransformFormData>
) => {
  const { headers: headerList, ...rest } = formData;

  const headers = headerList.reduce((pre, item) => {
    return { ...pre, [item.key]: item.value };
  }, {} as Record<string, any>);

  return {
    ...rest,
    headers,
    updatedBy: 'admin'
  };
};
