import{b as l}from"./request-DCRxv3nq.js";const m=`
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
`,a=`
  mutation insertUpdateLlm($className: String, $llmName: String!, $llmProvider: String!, $moduleName: String, $updatedBy: String!) {
    insertUpdateLlm(className: $className, llmName: $llmName, llmProvider: $llmProvider, moduleName: $moduleName, updatedBy: $updatedBy) {
        llm { llmProvider llmName moduleName className updatedBy createdAt updatedAt }
    }
  }
`,r=`
  mutation deleteLlm($llmName: String!, $llmProvider: String!) {
    deleteLlm(llmName: $llmName, llmProvider: $llmProvider) {
        ok
    }
  }
`,t=`
  query llm($llmProvider: String!, $llmName: String!) {
    llm(llmProvider: $llmProvider, llmName: $llmName) {
      llmProvider llmName moduleName className updatedBy createdAt updatedAt
    }
  }
`,d=e=>l.graphql({query:m,variables:e}),s=e=>l.graphql({query:a,variables:e}),o=e=>l.graphql({query:r,variables:e}),u=e=>l.graphql({query:t,variables:e});export{o as d,d as g,s as i,u as q};
