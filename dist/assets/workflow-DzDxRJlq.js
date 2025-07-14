var u=Object.defineProperty;var d=(i,e,t)=>e in i?u(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var r=(i,e,t)=>d(i,typeof e!="symbol"?e+"":e,t);import{x as w}from"./libs-DVH06oKf.js";class a{constructor(e,t){r(this,"code");r(this,"message");this.code=`${e}`,this.message=t}}const S="https://e7zmwbmq2c.execute-api.us-west-2.amazonaws.com/beta/core",f="oNaPRVvvsj1cJivZNpP7P2giiX8Dof4M94mghktw",c="openai",m=[S,c].join("/");class l{constructor(e){r(this,"request");r(this,"namespace");r(this,"baseUrl",m);r(this,"headers");r(this,"requestBefore",async e=>{if(this.headers){const t=await this.headers(e.headers);e.headers=Object.assign(e.headers,t)}return e});r(this,"parseSuccess",async e=>{const t=e.data;let p="10001",s=t.error;return s?(typeof s!="string"&&(p=s.errorType,s=s.errorMessage),Promise.reject(new a(p,s))):Promise.resolve(t.query?t:t.data)});r(this,"parseError",e=>{if(e.response)return this.parseSuccess(e.response);{const t=e.status,p=e.message;return Promise.reject(new a(t,p))}});const{apiKey:t=f}=e;e.baseUrl&&(this.baseUrl=e.baseUrl),this.request=w.create({baseURL:this.baseUrl,headers:{"x-api-key":t}}),this.headers=e.headers,this.namespace=e.namespace,this.send=this.send.bind(this),this.graphql=this.graphql.bind(this),this.request.interceptors.request.use(this.requestBefore),this.request.interceptors.response.use(this.parseSuccess,this.parseError)}send(e){return this.request.post(`/${this.namespace}`,e)}graphql(e){return this.send(e)}}new l({namespace:"ai_agent_build_graphql_query"});const o=new l({namespace:"ai_agent_core_graphql"}),n=`
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
`,h=`
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
        ${n}
      }
    }
  }
`,U=`
  query flowSnippet(
    $flowSnippetVersionUuid: String,
    $flowSnippetUuid: String
  ) {
    flowSnippet(
      flowSnippetVersionUuid: $flowSnippetVersionUuid, 
      flowSnippetUuid: $flowSnippetUuid
    ) {
      ${n}
    }
  }
`,$=`
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
        ${n}
      }
    }
  }
`,g=`
  mutation deleteFlowSnippet($flowSnippetVersionUuid: String!) {
    deleteFlowSnippet(flowSnippetVersionUuid: $flowSnippetVersionUuid) {
      ok
    }
  } 
`,V=i=>o.graphql({query:h,variables:i}),b=i=>o.graphql({query:U,variables:i}),N=i=>o.graphql({query:$,variables:i}),x=i=>o.graphql({query:g,variables:i});export{b as a,x as d,N as i,V as q};
