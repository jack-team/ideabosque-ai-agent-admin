import type { Schema, ProFormColumnType, FormItemType } from './types';

export const getFormColumn = (schema: Schema) => {
  const valueType = schema.valueType;
  const dependencys = schema.dependencys || [];

  const column: ProFormColumnType = {
    //@ts-ignore
    valueType,
    title: schema.title,
    tooltip: schema.tooltip,
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

// 获取 schemas 中所有的枚举
export const getValueEnum = (schemas: Schema[], valueEnum = {}) => {
  schemas.forEach((schema) => {
    if (schema.valueEnum) {
      valueEnum = Object.assign(
        valueEnum,
        schema.valueEnum
      );
    }
    schema.dependencys?.forEach((child) => {
      getValueEnum(child.renders, valueEnum);
    });
  });
  return valueEnum as Record<string, any>;
}

// 获取 schemas 中所有的表单项
export const getFormItems = (schemas: Schema[], items: FormItemType[] = []) => {
  schemas.forEach((schema) => {
    const childs = schema.dependencys || [];
    const valueType = schema.valueType || 'text';

    if (!childs.length) {
      items.push({
        type: valueType,
        name: schema.name
      });
    } else {
      childs.forEach((child) => {
        getFormItems(child.renders, items);
      });
    }
  });
  return items;
}