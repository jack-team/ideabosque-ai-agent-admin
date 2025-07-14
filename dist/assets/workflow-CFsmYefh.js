var u=Object.defineProperty;var d=(s,e,t)=>e in s?u(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>d(s,typeof e!="symbol"?e+"":e,t);import{x as w}from"./libs-DVH06oKf.js";class a{constructor(e,t){r(this,"code");r(this,"message");this.code=`${e}`,this.message=t}}const S="https://yuqnw5pscc.execute-api.us-west-2.amazonaws.com/beta/core",f="DwW7QneAAH28UR6NspPYw4dU1PEhcNxl5M9H2xkT",c="openai",h=[S,c].join("/");class l{constructor(e){r(this,"request");r(this,"namespace");r(this,"baseUrl",h);r(this,"headers");r(this,"requestBefore",async e=>{if(this.headers){const t=await this.headers(e.headers);e.headers=Object.assign(e.headers,t)}return e});r(this,"parseSuccess",async e=>{const t=e.data;let p="10001",i=t.error;return i?(typeof i!="string"&&(p=i.errorType,i=i.errorMessage),Promise.reject(new a(p,i))):Promise.resolve(t.query?t:t.data)});r(this,"parseError",e=>{if(e.response)return this.parseSuccess(e.response);{const t=e.status,p=e.message;return Promise.reject(new a(t,p))}});const{apiKey:t=f}=e;e.baseUrl&&(this.baseUrl=e.baseUrl),this.request=w.create({baseURL:this.baseUrl,headers:{"x-api-key":t}}),this.headers=e.headers,this.namespace=e.namespace,this.send=this.send.bind(this),this.graphql=this.graphql.bind(this),this.request.interceptors.request.use(this.requestBefore),this.request.interceptors.response.use(this.parseSuccess,this.parseError)}send(e){return this.request.post(`/${this.namespace}`,e)}graphql(e){return this.send(e)}}new l({namespace:"ai_agent_build_graphql_query"});const n=new l({namespace:"ai_agent_core_graphql"}),o=`
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
`,U=`
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
        ${o}
      }
    }
  }
`,m=`
  query flowSnippet(
    $flowSnippetVersionUuid: String,
    $flowSnippetUuid: String
  ) {
    flowSnippet(
      flowSnippetVersionUuid: $flowSnippetVersionUuid, 
      flowSnippetUuid: $flowSnippetUuid
    ) {
      ${o}
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
        ${o}
      }
    }
  }
`,g=`
  mutation deleteFlowSnippet($flowSnippetVersionUuid: String!) {
    deleteFlowSnippet(flowSnippetVersionUuid: $flowSnippetVersionUuid) {
      ok
    }
  } 
`,V=s=>n.graphql({query:U,variables:s}),b=s=>n.graphql({query:m,variables:s}),N=s=>n.graphql({query:$,variables:s}),x=s=>n.graphql({query:g,variables:s});export{b as a,x as d,N as i,V as q};
