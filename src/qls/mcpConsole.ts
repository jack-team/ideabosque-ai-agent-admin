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

export const insertUpdateMcpFunctionQl = `
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
`;

export const getListMcpFunctionCallsQl = `
 query ListMcpFunctionCalls(
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
    mcpFunctionCallList {
      endpointId
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
    pageSize
    pageNumber
    total
  }
}
`;

export const deleteMcpFunctionCallQl = `
  mutation DeleteMcpFunctionCall($mcpFunctionCallUuid: String!) {
  deleteMcpFunctionCall(mcpFunctionCallUuid: $mcpFunctionCallUuid) {
    ok
  }
}
`;

export const insertUpdateMcpFunctionCallQl = `
 mutation InsertUpdateMcpFunctionCall(
  $mcpFunctionCallUuid: String
  $name: String
  $mcpType: String
  $arguments: JSON
  $hasContent: Boolean
  $status: String
  $notes: String
  $timeSpent: Int
  $updatedBy: String!
) {
  insertUpdateMcpFunctionCall(
    mcpFunctionCallUuid: $mcpFunctionCallUuid
    name: $name
    mcpType: $mcpType
    arguments: $arguments
    hasContent: $hasContent
    status: $status
    notes: $notes
    timeSpent: $timeSpent
    updatedBy: $updatedBy
  ) {
    mcpFunctionCall {
      endpointId
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
query ListMcpSettings(
  $pageNumber: Int
  $limit: Int
  $settingId: String
) {
  mcpSettingList(
    pageNumber: $pageNumber
    limit: $limit
    settingId: $settingId
  ) {
    mcpSettingList {
      endpointId
      settingId
      setting
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

export const insertUpdateMcpSettingQl = `
mutation InsertUpdateMcpSetting(
  $settingId: String
  $setting: JSON
  $updatedBy: String!
) {
  insertUpdateMcpSetting(
    settingId: $settingId
    setting: $setting
    updatedBy: $updatedBy
  ) {
    mcpSetting {
      endpointId
      settingId
      setting
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;