import cloneDeep from 'clone-deep';
import type {
  Schema,
  FormData,
  FormDataItem,
  FormItemType,
  ProFormColumnType
} from './types';

export const getFormColumn = (schema: Schema) => {
  const valueType = schema.valueType;
  const dependencys = schema.dependencys || [];

  const column: ProFormColumnType = {
    //@ts-ignore
    valueType,
    width: schema.width,
    title: schema.title,
    tooltip: schema.tooltip,
    dataIndex: schema.name,
    valueEnum: schema.valueEnum,
    fieldProps: schema.fieldProps,
    initialValue: schema.initialValue,
    formItemProps: { rules: schema.rules }
  }

  if (schema.columns) {
    column.columns = schema.columns.map(getFormColumn);
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

export const transformInputFormData = (formData: FormData = {}) => {
  formData = cloneDeep(formData);
  return Object.keys(formData).reduce((pre, key) => {
    return { ...pre, [key]: formData[key].value };
  }, {} as Record<string, any>);
}

export const transformOutputFormData = (
  formData: Record<string, any>,
  formItems: FormItemType[],
  valueEnum: Record<string, any>
) => {
  Object.keys(formData).map(key => {
    const result = formItems.find(item => {
      return item.name === key;
    });

    const value = formData[key];
    const itemType = result?.type || 'text';

    const objValue: FormDataItem = {
      _type_: itemType,
      value
    }

    if (itemType === 'select') {
      objValue.label = valueEnum[value];
    }
    formData[key] = objValue;
  });
  return formData;
}