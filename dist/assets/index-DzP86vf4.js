import{q as c,A as d,ak as f,ah as S,u as h,j as e,W as g,y as x,h as b,i as u,p as _,al as j}from"./libs-ChT4hEeZ.js";import{S as y}from"./index-CbDiQ6FV.js";import{s as p}from"./index-CRzCV8gh.js";import{S as v}from"./index-DIMjatY4.js";import{_ as C}from"./lodash-CsfmQsJK.js";const I=t=>p.graphql({variables:t,query:`
      query getConfigSettingList(
        $shop: String!,
        $settingId: String
      ) {
        configSettingList(
          shop: $shop,
          settingId: $settingId
        ) {
          configSettingList{
            settingId
            settings
          }
        }
      }
    `}),q=t=>p.graphql({variables:t,query:`
     mutation insertUpdateConfigSetting(
      $shop: String!,
      $settingId: String!,
      $settings: JSON!
     ) {
        insertUpdateConfigSetting(
            shop: $shop,
            settingId: $settingId,
            settings: $settings,
        ) {
            configSetting{
                settingId
                settings
            }
        }
      }
    `}),w=t=>{if(t)try{return JSON.parse(t)}catch{return t}},$=t=>{const{settings:s,...n}=t;return{...n,settings:s.map(a=>{const i=a.value;return{...a,value:C.isObject(i)?JSON.stringify(i):i}})}},k=t=>t.map(s=>({...s,value:w(s.value)})),A="_container_1jmgw_1",F="_form_1jmgw_6",L="_submitter_1jmgw_11",N="_form_list_1jmgw_14",o={container:A,form:F,submitter:L,form_list:N},m={shop:"quickstart-91577e17.myshopify.com",settingId:"ai_marketing_engine_quickstart-91577e17"},P=()=>{const[t]=c.useForm(),{message:s}=d.useApp(),{data:n,loading:a}=f(async()=>{var l;const r=await I(m);return(l=r==null?void 0:r.configSettingList)==null?void 0:l.configSettingList[0]});S(()=>{n&&t.setFieldsValue($(n))},[n]);const i=h(async()=>{const r=await t.validateFields();try{await q({...m,settings:k(r.settings)}),s.success("Saved successfully")}catch{s.error("Save failed")}});return e.jsx(y,{loading:a,children:e.jsx("div",{className:o.container,children:e.jsxs(c,{form:t,submitter:!1,layout:"horizontal",className:o.form,children:[e.jsx(g,{label:"Setting ID",name:"settingId",labelCol:{flex:"180px"},labelAlign:"left",disabled:!0,rules:[{required:!0}]}),e.jsx(x,{name:"settings",actionRender:()=>[],creatorButtonProps:!1,className:o.form_list,children:e.jsxs(b,{children:[e.jsx(u,{flex:"180px",children:e.jsx(g,{readonly:!0,name:"variable",label:"Variable",labelCol:{span:24},wrapperCol:{span:24}})}),e.jsx(u,{flex:1,children:e.jsx(g,{name:"value",label:"Value",labelCol:{span:24},wrapperCol:{span:24}})})]})}),e.jsx("div",{className:o.submitter,children:e.jsx(v,{type:"primary",onClick:i,children:"Save"})})]})})})},B=()=>e.jsx(_,{title:"Settings",children:e.jsx(j,{items:[{key:"ai_marketing",label:"AI Marketing",children:e.jsx(P,{})}]})});export{B as default};
