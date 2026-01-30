export const mcpModuleListQuery = `
query mcpModuleList(
  $pageNumber: Int
  $limit: Int
  $mcpType: String
  $description: String
  $moduleName: String
  $className: String
  $functionName: String
) {
  mcpModuleList(
    pageNumber: $pageNumber
    limit: $limit
    mcpType: $mcpType
    description: $description
    moduleName: $moduleName
    className: $className
    functionName: $functionName
  ) {
    pageSize
    pageNumber
    total
    mcpModuleList {
      partitionKey
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

export const deleteMcpModuleQuery = `
  mutation deleteMcpModule($moduleName: String!) {
    deleteMcpModule(moduleName: $moduleName) {
      ok
    }
 }
`;

export const insertUpdateMcpModuleQuery = `
mutation refactored687(
  $classes: [JSONCamelCase]
  $moduleName: String!
  $packageName: String!
  $source: String
  $updatedBy: String!
) {
  insertUpdateMcpModule(
    classes: $classes
    moduleName: $moduleName
    packageName: $packageName
    source: $source
    updatedBy: $updatedBy
  ) {
    mcpModule {
      moduleName
    }
  }
}
`;

export const getMcpFunctionListQuery = `
query mcpFunctionList(
  $pageNumber: Int
  $limit: Int
  $mcpType: String
  $description: String
  $moduleName: String
  $className: String
  $functionName: String
) {
  mcpFunctionList(
    pageNumber: $pageNumber
    limit: $limit
    mcpType: $mcpType
    description: $description
    moduleName: $moduleName
    className: $className
    functionName: $functionName
  ) {
    pageSize
    pageNumber
    total
    mcpFunctionList {
      partitionKey
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
`;

export const deleteMcpFunctionQl = `
mutation deleteMcpFunction($name: String!) {
  deleteMcpFunction(name: $name) {
    ok
  }
}
`;

export const insertUpdateMcpFunctionQl = `
 mutation insertUpdateMcpFunction(
  $annotations: String
  $className: String
  $data: JSONCamelCase
  $description: String
  $functionName: String
  $isAsync: Boolean
  $mcpType: String!
  $moduleName: String
  $name: String!
  $returnType: String
  $updatedBy: String!
) {
  insertUpdateMcpFunction(
    annotations: $annotations
    className: $className
    data: $data
    description: $description
    functionName: $functionName
    isAsync: $isAsync
    mcpType: $mcpType
    moduleName: $moduleName
    name: $name
    returnType: $returnType
    updatedBy: $updatedBy
  ) {
    mcpFunction {
      partitionKey
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
`;

export const getListMcpFunctionCallsQl = `
 query mcpFunctionCallList(
  $pageNumber: Int
  $limit: Int
  $mcpType: String
  $name: String
  $status: String
) {
  mcpFunctionCallList(
    pageNumber: $pageNumber
    limit: $limit
    mcpType: $mcpType
    name: $name
    status: $status
  ) {
    pageSize
    pageNumber
    total
    mcpFunctionCallList {
      partitionKey
      mcpFunctionCallUuid
      mcpType
      name
      arguments
      content
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

export const deleteMcpFunctionCallQl = `
mutation deleteMcpFunctionCalldeleteMcpFunctionCall($mcpFunctionCallUuid: String!) {
  deleteMcpFunctionCall(mcpFunctionCallUuid: $mcpFunctionCallUuid) {
    ok
  }
}
`;

export const insertUpdateMcpFunctionCallQl = `
 mutation insertUpdateMcpFunctionCall(
  $arguments: JSONCamelCase
  $hasContent: Boolean
  $mcpFunctionCallUuid: String
  $mcpType: String
  $name: String
  $notes: String
  $status: String
  $timeSpent: Int
  $updatedBy: String!
) {
  insertUpdateMcpFunctionCall(
    arguments: $arguments
    hasContent: $hasContent
    mcpFunctionCallUuid: $mcpFunctionCallUuid
    mcpType: $mcpType
    name: $name
    notes: $notes
    status: $status
    timeSpent: $timeSpent
    updatedBy: $updatedBy
  ) {
    mcpFunctionCall {
      partitionKey
      mcpFunctionCallUuid
      mcpType
      name
      arguments
      content
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


export const listMcpSettingsQl = `
query mcpSettingList($pageNumber: Int, $limit: Int, $settingId: String) {
  mcpSettingList(
    pageNumber: $pageNumber
    limit: $limit
    settingId: $settingId
  ) {
    pageSize
    pageNumber
    total
    mcpSettingList {
      partitionKey
      settingId
      setting
      updatedBy
      createdAt
      updatedAt
    }
  }
}

`;

export const insertUpdateMcpSettingQl = `
mutation insertUpdateMcpSetting(
  $setting: JSONCamelCase
  $settingId: String
  $updatedBy: String!
) {
  insertUpdateMcpSetting(
    setting: $setting
    settingId: $settingId
    updatedBy: $updatedBy
  ) {
    mcpSetting {
      partitionKey
      settingId
      setting
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;