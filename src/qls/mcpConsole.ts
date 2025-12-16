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

export const deleteMcpModuleQl = `
  mutation DeleteMcpModule($moduleName: String!) {
    deleteMcpModule(moduleName: $moduleName) {
      ok
    }
  }
`;

export const insertUpdateMcpModuleQl = `
  mutation InsertUpdateMcpModule(
  $moduleName: String!
  $packageName: String!
  $classes: [JSON]
  $source: String
  $updatedBy: String!
) {
  insertUpdateMcpModule(
    moduleName: $moduleName
    packageName: $packageName
    classes: $classes
    source: $source
    updatedBy: $updatedBy
  ) {
    mcpModule {
      endpointId
      moduleName
      packageName
      classes
      source
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;