export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) {
    return;
  }

  let {
    questionCriteria,
    ...rest
  } = record;

  const criterias = {
    ...questionCriteria
  };

  return {
    ...rest,
    questionCriteria: Object.keys(criterias).map(key => (
      {
        attribute: key,
        value: criterias[key]
      }
    ))
  };
}

export const formDataToParams = (formData: Record<string, any>) => {
  const { questionCriteria, ...rest } = formData;
  const criterias = questionCriteria as any[];

  const criteriaMap = criterias.reduce((pre, item) => {
    return { ...pre, [item.attribute]: item.value };
  }, {} as Record<string, any>);

  return {
    ...rest,
    questionCriteria: criteriaMap,
    updatedBy: 'Admin'
  }
}