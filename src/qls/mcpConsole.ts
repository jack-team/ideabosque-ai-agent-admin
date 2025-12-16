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

export const getListMcpFunctionsQl = `
  query ListMcpFunctions(
  $pageNumber: Int
  $limit: Int
  $mcpType: String
  $moduleName: String
  $className: String
  $functionName: String
) {
  mcpFunctionList(
    pageNumber: $pageNumber
    limit: $limit
    mcpType: $mcpType
    moduleName: $moduleName
    className: $className
    functionName: $functionName
  ) {
    mcpFunctionList {
      endpointId
      name
      mcpType
      description
      data
      annotations
      moduleName
      className
      functionName
      returnType
      isAsync
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

export const deleteMcpFunctionQl = `
  mutation DeleteMcpFunction($name: String!) {
    deleteMcpFunction(name: $name) {
      ok
    }
  }
`;

export const insertUpdateMcpFunctionQl=`
  mutation InsertUpdateMcpFunction(
  $name: String!
  $mcpType: String!
  $description: String
  $data: JSON
  $annotations: String
  $moduleName: String
  $className: String
  $functionName: String
  $returnType: String
  $isAsync: Boolean
  $updatedBy: String!
) {
  insertUpdateMcpFunction(
    name: $name
    mcpType: $mcpType
    description: $description
    data: $data
    annotations: $annotations
    moduleName: $moduleName
    className: $className
    functionName: $functionName
    returnType: $returnType
    isAsync: $isAsync
    updatedBy: $updatedBy
  ) {
    mcpFunction {
      endpointId
      name
      mcpType
      description
      data
      annotations
      moduleName
      className
      functionName
      returnType
      isAsync
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`