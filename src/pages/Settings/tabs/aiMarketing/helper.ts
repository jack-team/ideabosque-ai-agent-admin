import _ from 'lodash';

export type ValueType = {
  settingId: string;
  settings: Array<{
    value?: string | Record<string, any>;
    variable: string;
  }>;
}

export const parseJson = (json?: string) => {
  if(!json) return;
  try {
    return JSON.parse(json);
  } catch (err) {
    return json;
  }
}

export const toFormDataValues = (values: ValueType) => {
  const { settings, ...reset } = values;
  return {
    ...reset,
    settings: settings.map(item => {
      const value = item.value;
      return {
        ...item,
        value: _.isObject(value) ?
          JSON.stringify(value) :
          value
      }
    })
  }
}

export const toSettingsData = (settings: ValueType['settings']) => {
  return settings.map(item => {
    return {
      ...item,
      value: parseJson(item.value as string)
    }
  })
}