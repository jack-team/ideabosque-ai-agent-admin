export const llmListQuery = `
  query llmList(
    $pageNumber: Int
    $limit: Int
    $llmProvider: String
    $moduleName: String
    $className: String
    $updatedAtGt: DateTime
    $updatedAtLt: DateTime
  ) {
    llmList(
      pageNumber: $pageNumber
      limit: $limit
      llmProvider: $llmProvider
      moduleName: $moduleName
      className: $className
      updatedAtGt: $updatedAtGt
      updatedAtLt: $updatedAtLt
    ) {
      pageSize
      pageNumber
      total
      llmList {
        llmProvider
        llmName
        moduleName
        className
        configurationSchema
        updatedBy
        createdAt
        updatedAt
      }
    } 
  }
`;