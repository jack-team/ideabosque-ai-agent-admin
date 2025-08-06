export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) return;

  const {
    wizards,
    ...rest
  } = record;

  return {
    ...rest,
    wizardUuids: wizards.map((e: any) => {
      return e.wizard_uuid
    })
  }
}

export const formDataToParams = (formData: Record<string, any>) => {
  return {
    ...formData,
    updatedBy: 'Admin'
  }
}