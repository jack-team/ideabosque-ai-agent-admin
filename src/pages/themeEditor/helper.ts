import type { FormInstance } from '@ant-design/pro-components';

export const getVariableConfigs = (configs: AgentSdkVariableConfigType[] = [], parent: string) => {
  return configs.map(config => ({ ...config, name: [parent, config.variable] }));
}

export const updateFormData = (form: FormInstance, values: Record<string, any>) => {
  const formData = form.getFieldsValue();
  const newFormData = Object.keys(formData).reduce((obj, key) => {
    return { ...obj, [key]: { ...formData[key], ...values[key] } }
  }, {} as Record<string, any>);
  form.setFieldsValue(newFormData);
}

// 通过配置或者变量
export const getVariables = (configs: AgentSdkVariableConfigType[]) => {
  return configs.reduce((v, c) => {
    let val = c.value;
    if (c.unit) val = val + c.unit;
    return { ...v, [c.variable]: val }
  }, {} as Record<string, any>);
}