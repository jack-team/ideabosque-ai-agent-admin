export const presignedUploadQl = `
  query presignedUploadUrl(
    $objectKey: String!, 
  ) {
    presignedUploadUrl(
      objectKey: $objectKey, 
    ) {
      url 
      objectKey
    }
  }
`;