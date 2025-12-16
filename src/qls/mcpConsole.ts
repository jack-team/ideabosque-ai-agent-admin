export const getListMcpModulesQl = `
  query ListMcpModules(
    $pageNumber: Int
    $limit: Int
    $mcpType: String
    $moduleName: String
    $className: String
    $functionName: String
  ) {
    mcpModuleList(
      pageNumber: $pageNumber
      limit: $limit
      mcpType: $mcpType
      moduleName: $moduleName
      className: $className
      functionName: $functionName
    ) {
      mcpModuleList {
        endpointId
        moduleName
        packageName
        classes
        source
        updatedBy
        createdAt
        updatedAt
      }
      pageSize
      pageNumber
      total
    }
  }
`;