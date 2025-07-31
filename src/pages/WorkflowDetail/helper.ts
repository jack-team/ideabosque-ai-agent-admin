export const formDataTransform = (formData: Record<string, any> = {}) => {
  return Object.keys(formData).reduce((obj, key) => {
    let value = formData[key]?.value;
    if (key === 'conditions') {
      key = 'branch';
      const list = value as any[];
      value = list?.map?.(item => (
        {
          label: item.condition,
          value: item.condition
        }
      ));
    }
    return { ...obj, [key]: value };
  }, {} as Record<string, any>);
}

export const dataTransform = (data: Record<string, any>) => {
  // 存在版本直接返回版本数据
  if (data?._v_) return data;
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