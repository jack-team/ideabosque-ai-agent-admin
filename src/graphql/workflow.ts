export const workflowListQuery = `
query flowSnippetList(
    $pageNumber: Int
    $limit: Int
    $flowSnippetUuid: String
    $promptUuid: String
    $flowName: String
    $statuses: [String]
    $updatedAtGt: DateTime
    $updatedAtLt: DateTime
 ){
  flowSnippetList(
    pageNumber: $pageNumber
    limit: $limit
    flowSnippetUuid: $flowSnippetUuid
    promptUuid: $promptUuid
    flowName: $flowName
    statuses: $statuses
    updatedAtGt: $updatedAtGt
    updatedAtLt: $updatedAtLt
  ) {
    pageSize
    pageNumber
    total
    flowSnippetList {
      flowSnippetVersionUuid
      flowSnippetUuid
      promptUuid
      flowName
      status
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const promptTemplateListQuery = `
query promptTemplateList(
  $pageNumber: Int
  $limit: Int
  $promptUuid: String
  $promptType: String
  $promptName: String
  $statuses: [String]
  $updatedAtGt: DateTime
  $updatedAtLt: DateTime
){
  promptTemplateList(
    pageNumber: $pageNumber
    limit: $limit
    promptUuid: $promptUuid
    promptType: $promptType
    promptName: $promptName
    statuses: $statuses
    updatedAtGt: $updatedAtGt
    updatedAtLt: $updatedAtLt
  ) {
    pageSize
    pageNumber
    total
    promptTemplateList {
      partitionKey
      endpointId
      partId
      promptVersionUuid
      promptUuid
      promptType
      promptName
      promptDescription
      templateContext
      variables
      status
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const promptTemplateQuery = `
query promptTemplate(
  $promptVersionUuid: String
  $promptUuid: String
){
  promptTemplate(
    promptVersionUuid: $promptVersionUuid, 
    promptUuid: $promptUuid
  ) {
    partitionKey
    endpointId
    partId
    promptVersionUuid
    promptUuid
    promptType
    promptName
    promptDescription
    templateContext
    variables
    status
    updatedBy
    createdAt
    updatedAt
    mcpServers
    uiComponents
  }
}
`;

export const insertUpdateWorkflowQuery = `
mutation insertUpdateFlowSnippet(
  $duplicate: Boolean
  $flowContext: String
  $flowName: String
  $flowRelationship: String
  $flowSnippetUuid: String
  $flowSnippetVersionUuid: String
  $promptUuid: String
  $status: String
  $updatedBy: String!
){
  insertUpdateFlowSnippet(
    duplicate: $duplicate
    flowContext: $flowContext
    flowName: $flowName
    flowRelationship: $flowRelationship
    flowSnippetUuid: $flowSnippetUuid
    flowSnippetVersionUuid: $flowSnippetVersionUuid
    promptUuid: $promptUuid
    status: $status
    updatedBy: $updatedBy
  ) {
    flowSnippet {
      flowSnippetVersionUuid
      flowSnippetUuid
    }
  }
}
`;

export const workflowQuery = `
query flowSnippet(
  $flowSnippetVersionUuid: String
  $flowSnippetUuid: String
){
  flowSnippet(
    flowSnippetVersionUuid: $flowSnippetVersionUuid, 
    flowSnippetUuid: $flowSnippetUuid
  ) {
    partitionKey
    endpointId
    partId
    flowSnippetVersionUuid
    flowSnippetUuid
    promptUuid
    flowName
    status
    updatedBy
    createdAt
    updatedAt
    flowRelationship
    flowContext
    promptTemplate {
      partitionKey
      endpointId
      partId
      promptVersionUuid
      promptUuid
      promptType
      promptName
      promptDescription
      templateContext
      variables
      status
      updatedBy
      createdAt
      updatedAt
      mcpServers
      uiComponents
    }
  }
}
`;

export const insertUpdatePromptTemplateQuery = `
mutation insertUpdatePromptTemplate(
    $duplicate: Boolean
    $mcpServers: [JSON]
    $promptDescription: String
    $promptName: String!
    $promptType: String!
    $promptUuid: String
    $promptVersionUuid: String
    $status: String
    $templateContext: String!
    $uiComponents: [JSON]
    $updatedBy: String!
    $variables: [JSON]
){
  insertUpdatePromptTemplate(
    duplicate: $duplicate
    mcpServers: $mcpServers
    promptDescription: $promptDescription
    promptName: $promptName
    promptType: $promptType
    promptUuid: $promptUuid
    promptVersionUuid: $promptVersionUuid
    status: $status
    templateContext: $templateContext
    uiComponents: $uiComponents
    updatedBy: $updatedBy
    variables: $variables
  ) {
    promptTemplate {
      partitionKey
      endpointId
      partId
      promptVersionUuid
      promptUuid
      promptType
      promptName
      promptDescription
      templateContext
      variables
      status
      updatedBy
      createdAt
      updatedAt
      mcpServers
      uiComponents
    }
  }
}
`;