export const mcpServerListQuery = `
query mcpServerList(
  $pageNumber: Int
  $limit: Int
  $mcpLabel: String
  $updatedAtGt: DateTime
  $updatedAtLt: DateTime
) {
  mcpServerList(
    pageNumber: $pageNumber
    limit: $limit
    mcpLabel: $mcpLabel
    updatedAtGt: $updatedAtGt
    updatedAtLt: $updatedAtLt
  ) {
    pageSize
    pageNumber
    total
    mcpServerList {
      mcpServerUuid
      mcpLabel
      mcpServerUrl
      headers
      tools
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const insertUpdateMcpServerQuery = `
mutation insertUpdateMcpServer(
  $headers: JSONCamelCase
  $mcpLabel: String!
  $mcpServerUrl: String!
  $mcpServerUuid: String
  $updatedBy: String!
) {
  insertUpdateMcpServer(
    headers: $headers
    mcpLabel: $mcpLabel
    mcpServerUrl: $mcpServerUrl
    mcpServerUuid: $mcpServerUuid
    updatedBy: $updatedBy
  ) {
    mcpServer {
      partitionKey
      endpointId
      partId
      mcpServerUuid
      mcpLabel
      mcpServerUrl
      headers
      tools
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const deleteMcpServerQuery = `
mutation deleteMcpServer($mcpServerUuid: String!) {
  deleteMcpServer(mcpServerUuid: $mcpServerUuid) {
    ok
  }
}
`