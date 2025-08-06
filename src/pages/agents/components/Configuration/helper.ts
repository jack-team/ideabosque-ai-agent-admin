
import type { SchemaTypes, ColumnType } from './types';

type HandlerType = (Column: ColumnType) => ColumnType;

export const transfromSchema = (schema: SchemaTypes, handler?: HandlerType) => {
  const properties = { ...schema.properties };
  const requireds = schema.required || [];

  return Object.keys(properties).map(key => {
    const item = properties[key];
    const required = requireds.includes(key);

    const valueEnum = item.enum?.reduce((pre, val) => {
      return { ...pre, [val]: val };
    }, {} as Record<string, any>);

    let result: ColumnType = {
      title: key,
      dataIndex: key,
      formItemProps: {
        tooltip: item.description,
        rules: [{ required }]
      },
      valueEnum
    }

    result = handler ?
      handler(result) : result;

    if (item.properties || item.items) {
      result.valueType = 'formSet';
    }

    if (item.properties) {
      result.columns = transfromSchema(item, (result) => {
        result.colProps = {
          span: 12
        }
        return result;
      });
    }

    return result;
  });
}