export const getLlmListQl = `
  query llmList(
    $pageNumber: Int, 
    $limit: Int, 
    $llmProvider: String, 
    $moduleName: String, 
    $className: String
  ) {
    llmList(
    pageNumber: $pageNumber, 
    limit: $limit, 
    llmProvider: $llmProvider, 
    moduleName: $moduleName, 
    className: $className
  ) {
      pageSize 
      pageNumber 
      total 
      llmList { 
        llmProvider 
        llmName 
        moduleName 
        className 
        updatedBy 
        createdAt 
        updatedAt 
      }
    }
  }      
`;

export const insertUpdateLlmQl = `
  mutation insertUpdateLlm($className: String, $llmName: String!, $llmProvider: String!, $moduleName: String, $updatedBy: String!) {
    insertUpdateLlm(className: $className, llmName: $llmName, llmProvider: $llmProvider, moduleName: $moduleName, updatedBy: $updatedBy) {
        llm { llmProvider llmName moduleName className updatedBy createdAt updatedAt }
    }
  }
`;

export const deleteLlmQl = `
  mutation deleteLlm($llmName: String!, $llmProvider: String!) {
    deleteLlm(llmName: $llmName, llmProvider: $llmProvider) {
        ok
    }
  }
`;

export const queryLlmQl = `
  query llm($llmProvider: String!, $llmName: String!) {
    llm(llmProvider: $llmProvider, llmName: $llmName) {
      llmProvider llmName moduleName className updatedBy createdAt updatedAt
    }
  }
`;