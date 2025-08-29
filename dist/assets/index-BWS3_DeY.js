import{y as c,A as f,e as d,h as S,f as h,j as e,W as g,K as x,n as b,o as m,x as _,ar as j}from"./libs-DTN1onay.js";import{S as y}from"./index-B011l3TC.js";import{s as p}from"./index-Cj4_r75M.js";import{S as v}from"./index-mSTSfG8m.js";import{_ as C}from"./lodash-DZ_VkN0M.js";const I=t=>p.graphql({variables:t,query:`
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
    `}),w=t=>p.graphql({variables:t,query:`
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
    `}),$=t=>{if(t)try{return JSON.parse(t)}catch{return t}},q=t=>{const{settings:s,...n}=t;return{...n,settings:s.map(a=>{const i=a.value;return{...a,value:C.isObject(i)?JSON.stringify(i):i}})}},k=t=>t.map(s=>({...s,value:$(s.value)})),A="_container_1jmgw_1",F="_form_1jmgw_6",L="_submitter_1jmgw_11",N="_form_list_1jmgw_14",o={container:A,form:F,submitter:L,form_list:N},u={shop:"quickstart-91577e17.myshopify.com",settingId:"ai_marketing_engine_quickstart-91577e17"},P=()=>{const[t]=c.useForm(),{message:s}=f.useApp(),{data:n,loading:a}=d(async()=>{var l;const r=await I(u);return(l=r==null?void 0:r.configSettingList)==null?void 0:l.configSettingList[0]});S(()=>{n&&t.setFieldsValue(q(n))},[n]);const i=h(async()=>{const r=await t.validateFields();try{await w({...u,settings:k(r.settings)}),s.success("Saved successfully")}catch{s.error("Save failed")}});return e.jsx(y,{loading:a,children:e.jsx("div",{className:o.container,children:e.jsxs(c,{form:t,submitter:!1,layout:"horizontal",className:o.form,children:[e.jsx(g,{label:"Setting ID",name:"settingId",labelCol:{flex:"180px"},labelAlign:"left",disabled:!0,rules:[{required:!0}]}),e.jsx(x,{name:"settings",actionRender:()=>[],creatorButtonProps:!1,className:o.form_list,children:e.jsxs(b,{children:[e.jsx(m,{flex:"180px",children:e.jsx(g,{readonly:!0,name:"variable",label:"Variable",labelCol:{span:24},wrapperCol:{span:24}})}),e.jsx(m,{flex:1,children:e.jsx(g,{name:"value",label:"Value",labelCol:{span:24},wrapperCol:{span:24}})})]})}),e.jsx("div",{className:o.submitter,children:e.jsx(v,{type:"primary",onClick:i,children:"Save"})})]})})})},B=()=>e.jsx(_,{title:"Settings",children:e.jsx(j,{items:[{key:"ai_marketing",label:"AI Marketing",children:e.jsx(P,{})}]})});export{B as default};
