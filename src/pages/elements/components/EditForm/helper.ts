export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) return;

  const { elements, ...rest } = record;
  

  return { ...rest };
}

export const formDataToParams = (formData: Record<string, any>) => {
  return {
    ...formData,
    updatedBy: 'Admin'
  }
}