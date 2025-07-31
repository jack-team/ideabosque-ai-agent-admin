export const formDataTransform = (formData: Record<string, any> = {}) => {
  return Object.keys(formData).reduce((obj, key) => {
    return { ...obj, [key]: formData[key]?.value };
  }, { } as Record<string, any>);
}

export const dataTransform = (data: Record<string, any>) => {
  // 存在版本直接返回版本数据
  if (data?.version) return data;
  let nodes = (data?.nodes || []) as any[];

  nodes = nodes.map(node => {
    const values = node?.data?.values;
    return {
      ...node,
      data: {
        nodeType: values?.nodeType,
        formData: formDataTransform(values?.formData),
        details: dataTransform(values?.stepRealData)
      }
    }
  });
  return { ...data, nodes };
}