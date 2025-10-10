import { parseJson } from '@/utils';

type Obj = Record<string, any>;

export const parseData = (json: Obj) => {
  const wizards = (json.wizards || []) as any[];

  const items = wizards.map(item => {
    const { form_schema, elements, ...rest } = item;
    const schema = parseJson(form_schema) || {}
    return { ...rest, form_schema: schema };
  });

  return { ...json, wizards: items };
}

export function getNestedValue(obj: Obj, paths: string[]) {
  return paths.reduce((cur, key) => cur?.[key], obj);
}


export const getFormNamePath = (type: string, names: string[]) => {
  return ["form_schema", type, ...names];
}