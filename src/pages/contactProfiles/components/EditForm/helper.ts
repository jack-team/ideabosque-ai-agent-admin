export const recordToFormData = (record?: Record<string, any>) => {
  if (!record) {
    return;
  }

  const {
    data,
    place,
    ...rest
  } = record;

  return {
    ...rest,
    data: data ? JSON.stringify(data, null, 4) : null,
    place: place ? JSON.stringify(place, null, 4) : null
  }
}