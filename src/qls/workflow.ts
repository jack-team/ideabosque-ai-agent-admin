export const flowSnippetFields = `
  endpointId 
  flowSnippetVersionUuid 
  flowSnippetUuid 
  promptVersionUuid 
  promptUuid 
  flowName 
  flowRelationship 
  flowContext 
  status 
  updatedBy 
  createdAt 
  updatedAt 
`;

export const queryFlowSnippetListQl = `
  query flowSnippetList(
    $pageNumber: Int, 
    $limit: Int, 
    $flowSnippetUuid: String, 
    $promptVersionUuid: String, 
    $promptUuid: String, 
    $flowName: String, 
    $statuses: [String]
  ) {
    flowSnippetList(
      pageNumber: $pageNumber, 
      limit: $limit, 
      flowSnippetUuid: $flowSnippetUuid,
      promptVersionUuid: $promptVersionUuid, 
      promptUuid: $promptUuid, 
      flowName: $flowName, 
      statuses: $statuses
    ) {
      pageSize 
      pageNumber 
      total 
      flowSnippetList { 
        ${flowSnippetFields}
      }
    }
  }
`;

export const queryFlowSnippetQl = `
  query flowSnippet(
    $flowSnippetVersionUuid: String,
    $flowSnippetUuid: String
  ) {
    flowSnippet(
      flowSnippetVersionUuid: $flowSnippetVersionUuid, 
      flowSnippetUuid: $flowSnippetUuid
    ) {
      ${flowSnippetFields}
    }
  }
`;

export const insertUpdateFlowSnippetQl = `
  mutation insertUpdateFlowSnippet(
    $flowContext: String!, 
    $flowName: String!, 
    $flowRelationship: String, 
    $flowSnippetUuid: String, 
    $flowSnippetVersionUuid: String, 
    $promptUuid: String!, 
    $promptVersionUuid: String!, 
    $status: String, 
    $updatedBy: String!
  ) {
    insertUpdateFlowSnippet(
      flowContext: $flowContext, 
      flowName: $flowName, 
      flowRelationship: $flowRelationship, 
      flowSnippetUuid: $flowSnippetUuid, 
      flowSnippetVersionUuid: $flowSnippetVersionUuid, 
      promptUuid: $promptUuid, 
      promptVersionUuid: $promptVersionUuid, 
      status: $status, 
      updatedBy: $updatedBy
    ) {
      flowSnippet { 
        ${flowSnippetFields}
      }
    }
  }
`;

export const deleteFlowSnippetQl = `
  mutation deleteFlowSnippet($flowSnippetVersionUuid: String!) {
    deleteFlowSnippet(flowSnippetVersionUuid: $flowSnippetVersionUuid) {
      ok
    }
  } 
`;