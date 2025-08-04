import{a as e}from"./request-BPdAPW8d.js";import{g as n}from"./generate-C1aCBGPy.js";const i=`
  query agentList($pageNumber: Int, $limit: Int, $agentUuid: String, $agentName: String, $llmProvider: String, $llmName: String, $model: String, $statuses: [String]) {
    agentList(pageNumber: $pageNumber, limit: $limit, agentUuid: $agentUuid, agentName: $agentName, llmProvider: $llmProvider, llmName: $llmName, model: $model, statuses: $statuses) {
      pageSize pageNumber total agentList { endpointId agentVersionUuid agentUuid agentName agentDescription llm instructions configuration functionConfiguration functions numOfMessages toolCallRole status updatedBy createdAt updatedAt }
    }
  }  
`,s=t=>e.graphql({query:i,variables:t}),o=async t=>{const a=await n({type:"Mutation",name:"insertUpdateAgent"});return e.graphql({query:a,variables:t})};export{s as g,o as i};
