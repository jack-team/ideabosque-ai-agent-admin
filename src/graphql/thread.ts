export const threadListQuery = `
query threadList(
    $pageNumber: Int
    $limit: Int
    $agentUuid: String
    $userId: String
    $createdAtGt: DateTime
    $createdAtLt: DateTime
){
  threadList(
    pageNumber: $pageNumber
    limit: $limit
    agentUuid: $agentUuid
    userId: $userId
    createdAtGt: $createdAtGt
    createdAtLt: $createdAtLt
  ) {
    pageSize
    pageNumber
    total
    threadList {
      partitionKey
      endpointId
      partId
      threadUuid
      agentUuid
      userId
      createdAt
      agent {
        agentName
      }
      messages
      toolCalls
    }
  }
}
`;

export const threadQuery = `
query thread($threadUuid: String!) {
  thread(threadUuid: $threadUuid) {
    partitionKey
    endpointId
    partId
    threadUuid
    agentUuid
    userId
    createdAt
    agent {
      partitionKey
      agentVersionUuid
      endpointId
      partId
      agentUuid
      agentName
      agentDescription
      llmProvider
      llmName
      mcpServerUuids
      flowSnippetVersionUuid
      instructions
      configuration
      variables
      numOfMessages
      toolCallRole
      status
      updatedBy
      createdAt
      updatedAt
      mcpServers {
        mcpServerUuid
        mcpLabel
        mcpServerUrl
        headers
        tools
      }
    }
    messages
    toolCalls
  }
}
`;