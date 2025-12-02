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

export const presignedAwsS3UrlQl = `
  query presignedAwsS3Url(
    $clientMethod: String!, 
    $objectKey: String!
    $expiration: Int!
  ) {
    presignedAwsS3Url(
      clientMethod: $clientMethod, 
      objectKey: $objectKey,
      expiration: $expiration
    ) {
      url
      objectKey     
      expiration
    }
  }
`;