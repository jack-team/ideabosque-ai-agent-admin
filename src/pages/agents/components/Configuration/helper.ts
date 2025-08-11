
import type {
  SchemaTypes,
  FormItemType,
  ValidateNumberOptions
} from './types';

const ParamSchema: SchemaTypes = {
  type: 'object',
  required: ['name', 'type'],
  properties: {
    type: {
      type: 'string',
      enum: [
        "string",
        "number",
        "integer",
        "boolean",
        "object",
        "array"
      ]
    },
    name: {
      type: 'string'
    }
  }
}

export const transfromSchema = (schema: SchemaTypes): FormItemType[] => {
  const properties = { ...schema.properties };
  const requireds = schema.required || [];

  return Object.keys(properties).map((key) => {
    const item = properties[key];
    let items = item.items;
    const required = requireds.includes(key);

    const options = item.enum?.map(val => {
      return {
        label: val,
        value: val
      }
    });

    const result: FormItemType = {
      label: key,
      name: key,
      required,
      type: item.type,
      minimum: item.minimum,
      maximum: item.maximum
    }

    if ('$ref' in item) {
      items = ParamSchema;
    }

    if (options) {
      result.options = options;
    }

    if (items) {
      const arr = transfromSchema(items);
      result.items = arr;
    }

    if (item.description) {
      result.tip = item.description;
    }

    if (item.properties) {
      const arr = transfromSchema(item);
      result.children = arr;
    }

    return result;
  });
}

export function validateNumber(input: string, options: ValidateNumberOptions = {}) {
  const { min, max, allowDecimal } = options;

  const numberRegex = /^\d+$/;
  const decimalNumberRegex = /^\d+(\.\d+)?$/;

  const regex = allowDecimal ?
    decimalNumberRegex :
    numberRegex;

  if (!regex.test(input)) {
    return {
      success: false,
      message: 'Please enter a number'
    }
  }

  // 将输入转换为数字
  const number = parseFloat(input);

  // 检查范围
  if (min !== undefined && number < min) {
    return {
      success: false,
      message: `The input number cannot be less than ${min}.`
    }
  }

  if (max !== undefined && number > max) {
    return {
      success: false,
      message: `The input number cannot be greater than ${min}.`
    }
  }

  return {
    success: true,
    message: 'Success.'
  }
}
