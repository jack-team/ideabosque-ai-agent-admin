export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) return;

  const { elements, ...rest } = record;
  
  const elementUuids = elements.map((item: Record<string, any>) => {
    return item.element_uuid;
  });

  return { ...rest, elementUuids };
}

export const formDataToParams = (formData: Record<string, any>) => {
  return {
    ...formData,
    updatedBy: 'Admin'
  }
}