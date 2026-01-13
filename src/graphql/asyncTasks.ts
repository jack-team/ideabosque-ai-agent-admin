export const asyncTaskListQuery = `
query asyncTaskList(
    $pageNumber: Int
    $limit: Int
    $functionName: String
    $statues: [String]
){
  asyncTaskList(
    pageNumber: $pageNumber
    limit: $limit
    functionName: $functionName
    statues: $statues
  ) {
    pageSize
    pageNumber
    total
    asyncTaskList {
      functionName
      asyncTaskUuid
      partitionKey
      arguments
      result
      outputFiles
      status
      notes
      timeSpent
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;