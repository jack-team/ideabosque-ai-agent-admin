export const getAgentListQl = `
  query agentList($pageNumber: Int, $limit: Int, $agentUuid: String, $agentName: String, $llmProvider: String, $llmName: String, $model: String, $statuses: [String]) {
    agentList(pageNumber: $pageNumber, limit: $limit, agentUuid: $agentUuid, agentName: $agentName, llmProvider: $llmProvider, llmName: $llmName, model: $model, statuses: $statuses) {
      pageSize pageNumber total agentList { endpointId agentVersionUuid agentUuid agentName agentDescription llm instructions configuration functionConfiguration functions numOfMessages toolCallRole status updatedBy createdAt updatedAt }
    }
  }  
`;

export const insertUpdateAgentQl = `
  mutation insertUpdateAgent(
    $agentDescription: String, 
    $agentName: String, 
    $agentUuid: String, 
    $agentVersionUuid: String, 
    $configuration: JSON, 
    $functionConfiguration: JSON, 
    $functions: JSON, 
    $instructions: String, 
    $llmName: String, 
    $llmProvider: String, 
    $numOfMessages: Int, 
    $status: String, 
    $toolCallRole: String, 
    $updatedBy: String!
  ) {
    insertUpdateAgent(
      agentDescription: $agentDescription, 
      agentName: $agentName, 
      agentUuid: $agentUuid, 
      agentVersionUuid: $agentVersionUuid, 
      configuration: $configuration, 
      functionConfiguration: $functionConfiguration, 
      functions: $functions, 
      instructions: $instructions, 
      llmName: $llmName, 
      llmProvider: $llmProvider, 
      numOfMessages: $numOfMessages, 
      status: $status, 
      toolCallRole: $toolCallRole, 
      updatedBy: $updatedBy
    ) {
        agent { 
          endpointId 
          agentVersionUuid 
          agentUuid 
          agentName 
          agentDescription 
          llm 
          instructions 
          configuration 
          functionConfiguration 
          functions 
          numOfMessages 
          toolCallRole 
          status 
          updatedBy 
          createdAt 
          updatedAt 
        }
    }
  }
`;