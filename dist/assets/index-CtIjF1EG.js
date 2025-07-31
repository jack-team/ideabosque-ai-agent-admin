import{m as j,u as h,ah as x,ak as _,j as e,P as L,al as F,ai as P,B as w,o as A,b as v,h as y,p as I,v as N,am as R,n as k,d as O,S as T,aj as E}from"./libs-0PvTe91r.js";import{c as z}from"./index-DuVnbgUf.js";import{u as J,T as b}from"./index-DPy9wtRK.js";import{p as $}from"./index-Bl_Q_f31.js";import{b as V}from"./request-DTZC4S0h.js";import{g as Y}from"./llm-DEuDq4HS.js";import"./index-CendYzG9.js";const Q=`
  query agentList($pageNumber: Int, $limit: Int, $agentUuid: String, $agentName: String, $llmProvider: String, $llmName: String, $model: String, $statuses: [String]) {
    agentList(pageNumber: $pageNumber, limit: $limit, agentUuid: $agentUuid, agentName: $agentName, llmProvider: $llmProvider, llmName: $llmName, model: $model, statuses: $statuses) {
      pageSize pageNumber total agentList { endpointId agentVersionUuid agentUuid agentName agentDescription llm instructions configuration functionConfiguration functions numOfMessages toolCallRole status updatedBy createdAt updatedAt }
    }
  }  
`,W=`
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
`,q=r=>V.graphql({query:Q,variables:r}),B=r=>V.graphql({query:W,variables:r}),H=r=>{const[o,n]=j(!1),t=h(async()=>{const{agentList:s}=await q({limit:5,pageNumber:1,agentUuid:r.agentUuid});return{total:s.total,data:s.agentList}}),a=h(async s=>{s.documentSource.data_source_name;try{x.success("Deleted successfully.")}catch{x.error("Deleted failed.")}});return _(t),e.jsx(L,{rowKey:"agentVersionUuid",search:!1,toolBarRender:!1,request:t,className:"shopify",columns:[{dataIndex:"agentVersionUuid",title:"Agent Version Uuid"},{dataIndex:"status",title:"Status",render:(s,i,g,l)=>{var d;const c=((d=l==null?void 0:l.pageInfo)==null?void 0:d.total)||0,u=i.status==="active",m=u&&c<=1;return e.jsx(F,{checked:u,disabled:m,loading:o,onChange:async f=>{n(!0);try{await B({updatedBy:i.updatedBy,agentUuid:i.agentUuid,agentVersionUuid:i.agentVersionUuid,status:f?"active":"inactive"}),l==null||l.reload()}catch(p){console.error(p)}finally{n(!1)}}})}},{width:70,dataIndex:"action",title:"Action",render:(s,i)=>e.jsx(P,{okText:"Delete",okType:"danger",title:"Are you sure you want to delete this version?",onConfirm:()=>a(i),children:e.jsx(w,{danger:!0,type:"link",disabled:i.status==="active",children:"Delete"})})}]})},S=r=>JSON.stringify(r,null,2),K=()=>{const[r,o]=j([]),[n,t]=j(!0),a=h(async()=>{const{llmList:s}=await Y({pageNumber:1,limit:1e3}),g=((s==null?void 0:s.llmList)||[]).map(l=>({label:l.llmName,value:S({llmName:l.llmName,llmProvider:l.llmProvider})}));o(g),t(!1)});return _(a),[r,n]},G="_container_1wk1t_1",X={container:G},C=r=>{const{insert:o=!0,formData:n,onSuccess:t}=r,[a]=A.useForm(),[s,i]=K(),g=v.useMemo(()=>{if(!n)return;let c=n.llm,u=n.functions,m=n.configuration,d=n.functionConfiguration;return c&&(c=S({llmName:c.llm_name,llmProvider:c.llm_provider})),u&&(u=S(u)),m&&(m=S(m)),d&&(d=S(d)),{...n,llm:c,functions:u,configuration:m,functionConfiguration:d,status:n.status==="active"}},[n]),l=h(async()=>{const c=await a.validateFields();let{llm:u,status:m,functions:d,configuration:f,functionConfiguration:p,...M}=c;u&&(u=$(u)),d&&(d=$(d)),f&&(f=$(f)),p&&(p=$(p));try{const U={...M,...u,functions:d,configuration:f,status:m?"active":"inactive",functionConfiguration:p,updatedBy:"admin"};await B(U),t==null||t(),x.success(`${o?"Created":"Updated"} successfully.`)}catch(U){return x.error(`${o?"Creation":"Updated"} failed.`),Promise.reject(U)}});return J(l),e.jsx("div",{className:X.container,children:e.jsxs(A,{form:a,submitter:!1,labelAlign:"left",layout:"horizontal",initialValues:g,labelCol:{flex:"160px"},children:[e.jsxs(y,{className:"shopify",children:[e.jsx(I,{label:"Llm",name:"llm",options:s,fieldProps:{loading:i},rules:[{required:!0}]}),!o&&e.jsx(I,{readonly:!0,name:"agentUuid",label:"Agent Uuid",rules:[{required:!0}]}),e.jsx(N,{label:"Agent Name",name:"agentName",rules:[{required:!0}]}),e.jsx(N,{label:"Instructions",name:"instructions",fieldProps:{cols:6},rules:[{required:!0}]}),e.jsx(R,{label:"Status",name:"status"})]}),e.jsx(y,{title:"Configuration",className:"shopify",children:e.jsx(N,{name:"configuration"})}),e.jsx(y,{title:"Function Configuration",className:"shopify",children:e.jsx(N,{name:"functionConfiguration"})}),e.jsx(y,{title:"Functions",className:"shopify",children:e.jsx(N,{name:"functions"})}),!o&&e.jsx(y,{title:"Versions",className:"shopify",children:e.jsx(H,{agentUuid:n==null?void 0:n.agentUuid})})]})})},D=600,re=()=>{const r=v.useRef(null),o=h(()=>{var t;(t=r.current)==null||t.reload()}),n=h(async t=>{try{o(),x.success("Deleted successfully.")}catch{x.error("Deleted failed.")}});return e.jsx(k,{className:"shopify",children:e.jsx(L,{options:!1,actionRef:r,className:"shopify",rowKey:"agentVersionUuid",search:{labelWidth:"auto",optionRender:(t,a,s)=>s.map(i=>v.cloneElement(i,{className:"shopify"}))},scroll:{x:"max-content"},request:async t=>{const{pageSize:a,current:s,...i}=t,{agentList:g}=await q({...i,limit:a,pageNumber:s,statuses:["active"]});return{total:g.total,data:g.agentList}},toolbar:{actions:[e.jsx(b,{okText:"Save",title:"Add Agent",width:D,trigger:e.jsx(w,{type:"primary",children:"Add",className:"shopify",icon:e.jsx(E,{})}),children:e.jsx(C,{onSuccess:o})},"add")]},columns:[{title:"Agent Name",dataIndex:"agentName",hideInSearch:!1},{title:"Agent Uuid",dataIndex:"agentUuid",hideInSearch:!1},{title:"Status",dataIndex:"status",hideInSearch:!0},{title:"Llm Provider",dataIndex:"llm_provider",hideInSearch:!0,render:(t,a)=>a.llm.llm_provider},{title:"Llm Name",dataIndex:"llm_name",hideInSearch:!0,render:(t,a)=>a.llm.llm_name},{title:"Updated At",dataIndex:"updatedAt",hideInSearch:!0,render:(t,a)=>O(a.updatedAt).format("YYYY/MM/DD HH:mm:ss")},{title:"Updated By",dataIndex:"updatedBy",hideInSearch:!0},{fixed:"right",width:100,title:"Actions",dataIndex:"actions",hideInSearch:!0,render:(t,a)=>e.jsxs(T,{size:16,children:[e.jsx(b,{okText:"Save",width:D,title:"Edit Agent",trigger:e.jsx("a",{children:"Edit"}),children:e.jsx(C,{insert:!1,onSuccess:o,formData:z(a)})},"add"),e.jsx(P,{okText:"Delete",okType:"danger",title:"Are you sure you want to delete it?",onConfirm:()=>n(a.questionUuid),children:e.jsx("a",{className:"danger",children:"Delete"})})]})}]})})};export{re as default};
