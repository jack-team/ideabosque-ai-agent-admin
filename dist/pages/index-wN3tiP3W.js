import{C as f,E as d,D as S,k as e}from"../chunks/vendor-BASRo5BV.js";import{S as h}from"../chunks/index-RQNN36hI.js";import{s as p}from"../assets/index-BJk3dTtz.js";import{g as c,A as x,W as g,l as b,R as _,a as m,f as j,H as y}from"../chunks/ui-CrIkMfD8.js";import{S as v}from"../chunks/index-7RUIiB2k.js";import{_ as C}from"../chunks/lodash-H6qfVBzT.js";import"../chunks/utils-BMDVF5td.js";const I=t=>p.graphql({variables:t,query:`
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
    `}),$=t=>{if(t)try{return JSON.parse(t)}catch{return t}},k=t=>{const{settings:s,...i}=t;return{...i,settings:s.map(a=>{const n=a.value;return{...a,value:C.isObject(n)?JSON.stringify(n):n}})}},q=t=>t.map(s=>({...s,value:$(s.value)})),A="_container_1jmgw_1",F="_form_1jmgw_6",L="_submitter_1jmgw_11",N="_form_list_1jmgw_14",o={container:A,form:F,submitter:L,form_list:N},u={shop:"quickstart-91577e17.myshopify.com",settingId:"ai_marketing_engine_quickstart-91577e17"},P=()=>{const[t]=c.useForm(),{message:s}=x.useApp(),{data:i,loading:a}=f(async()=>{var l;const r=await I(u);return(l=r==null?void 0:r.configSettingList)==null?void 0:l.configSettingList[0]});d(()=>{i&&t.setFieldsValue(k(i))},[i]);const n=S(async()=>{const r=await t.validateFields();try{await w({...u,settings:q(r.settings)}),s.success("Saved successfully")}catch{s.error("Save failed")}});return e.jsx(h,{loading:a,children:e.jsx("div",{className:o.container,children:e.jsxs(c,{form:t,submitter:!1,layout:"horizontal",className:o.form,children:[e.jsx(g,{label:"Setting ID",name:"settingId",labelCol:{flex:"180px"},labelAlign:"left",disabled:!0,rules:[{required:!0}]}),e.jsx(b,{name:"settings",actionRender:()=>[],creatorButtonProps:!1,className:o.form_list,children:e.jsxs(_,{children:[e.jsx(m,{flex:"180px",children:e.jsx(g,{readonly:!0,name:"variable",label:"Variable",labelCol:{span:24},wrapperCol:{span:24}})}),e.jsx(m,{flex:1,children:e.jsx(g,{name:"value",label:"Value",labelCol:{span:24},wrapperCol:{span:24}})})]})}),e.jsx("div",{className:o.submitter,children:e.jsx(v,{type:"primary",onClick:n,children:"Save"})})]})})})},E=()=>e.jsx(j,{title:"Settings",children:e.jsx(y,{items:[{key:"ai_marketing",label:"AI Marketing",children:e.jsx(P,{})}]})});export{E as default};
