export const agentListQuery = `
  query agentList(
    $pageNumber: Int
    $limit: Int
    $agentUuid: String
    $agentName: String
    $llmProvider: String
    $llmName: String
    $model: String
    $statuses: [String]
    $flowSnippetVersionUuid: String
  ) {
    agentList(
      pageNumber: $pageNumber
      limit: $limit
      agentUuid: $agentUuid
      agentName: $agentName
      llmProvider: $llmProvider
      llmName: $llmName
      model: $model
      statuses: $statuses
      flowSnippetVersionUuid: $flowSnippetVersionUuid
    ) {
      pageSize
      pageNumber
      total
      agentList {
        agentVersionUuid
        agentUuid
        agentName
        agentDescription
        status
        createdAt
        updatedAt
        flowSnippet {
          promptUuid
        }
      }
    }
  }
`;

export const agentDetailQuery = `
  query agent($agentUuid: String, $agentVersionUuid: String) {
    agent(agentUuid: $agentUuid, agentVersionUuid: $agentVersionUuid) {
      agentUuid
      agentName
      agentVersionUuid
      agentDescription
      llm {
        llmProvider
        llmName
        configurationSchema
      } 
      variables
      mcpServers {
        mcpServerUuid
        mcpLabel
        mcpServerUrl
        headers
        tools
      }
      mcpServerUuids
      instructions
      configuration
      numOfMessages
      toolCallRole
      flowSnippetVersionUuid
      flowSnippet {
        promptUuid
        flowName
        flowSnippetUuid
      }
    }
  }  
`;

export const coordinationListQuery = `
  query coordinationList(
    $pageNumber: Int, 
    $limit: Int, 
    $coordinationName: String, 
    $coordinationDescription: String
  ) {
    coordinationList(
      pageNumber: $pageNumber, 
      limit: $limit, 
      coordinationName: $coordinationName, 
      coordinationDescription: $coordinationDescription
    ) {
      pageSize 
      pageNumber 
      total 
      coordinationList { 
        coordinationUuid 
        coordinationName 
        coordinationDescription 
        updatedBy 
        createdAt 
        updatedAt 
        agents
      }
    }
  }
`;

export const coordinationQuery = `
  query coordination($coordinationUuid: String!) {
    coordination(coordinationUuid: $coordinationUuid) {
      coordinationUuid
      coordinationName
      coordinationDescription
      agents
      updatedBy
      createdAt
      updatedAt
    }
  }
`;

export const insertUpdateCoordinationQuery = `
  mutation insertUpdateCoordination(
    $agents: [JSON]
    $coordinationDescription: String
    $coordinationName: String
    $coordinationUuid: String
    $updatedBy: String!
  ) {
    insertUpdateCoordination(
      agents: $agents
      coordinationDescription: $coordinationDescription
      coordinationName: $coordinationName
      coordinationUuid: $coordinationUuid
      updatedBy: $updatedBy
    ) {
      coordination {
        coordinationUuid
        coordinationName
      }
    }
  }
`;

export const deleteCoordinationQuery = `
  mutation deleteCoordination($coordinationUuid: String!){
    deleteCoordination(coordinationUuid: $coordinationUuid) {
      ok
    }
  }
`;

export const insertUpdateAgentQuery = `
  mutation insertUpdateAgent(
    $agentDescription: String
    $agentName: String
    $agentUuid: String
    $agentVersionUuid: String
    $configuration: JSON
    $duplicate: Boolean
    $flowSnippetVersionUuid: String
    $instructions: String
    $llmName: String
    $llmProvider: String
    $mcpServerUuids: [String]
    $numOfMessages: Int
    $status: String
    $toolCallRole: String
    $updatedBy: String!
    $variables: [JSON]
  ){
    insertUpdateAgent(
      agentDescription: $agentDescription
      agentName: $agentName
      agentUuid: $agentUuid
      agentVersionUuid: $agentVersionUuid
      configuration: $configuration
      duplicate: $duplicate
      flowSnippetVersionUuid: $flowSnippetVersionUuid
      instructions: $instructions
      llmName: $llmName
      llmProvider: $llmProvider
      mcpServerUuids: $mcpServerUuids
      numOfMessages: $numOfMessages
      status: $status
      toolCallRole: $toolCallRole
      updatedBy: $updatedBy
      variables: $variables
    ) {
      agent {
        agentName
      }
    }
  }
`;