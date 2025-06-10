import type { Schema, ProFormColumnType } from './types';

export const getFormColumn = (schema: Schema) => {
  const valueType = schema.valueType;
  const dependencys = schema.dependencys || [];

  const column: ProFormColumnType = {
    //@ts-ignore
    valueType,
    title: schema.title,
    dataIndex: schema.name,
    valueEnum: schema.valueEnum,
    formItemProps: { rules: schema.rules }
  }

  // 关联
  if (dependencys.length) {
    column.valueType = 'dependency';
    column.name = dependencys.map(e => e.name);

    column.columns = (formData: Record<string, any>) => {
      const items = dependencys.filter(
        ({ name, values = [] }) =>
          values.find(val => val === formData[name])
      );
      return items.reduce((pre, cur) => {
        const renders = cur.renders || [];
        return [...pre, ...renders.map(getFormColumn)];
      }, [] as ProFormColumnType[]);
    };
  }

  return column;
}