import _ from 'lodash';
import cloneDeep from 'clone-deep';

import type {
  SchemaTypes,
  FormItemType,
  ValidateNumberOptions
} from './types';

export const ParamSchema: SchemaTypes = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['string', 'object']
    }
  },
  required: [
    'name',
    'type',
    'description'
  ]
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

    item.definitions = schema.definitions;

    if (items) {
      items.definitions = schema.definitions;
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

export const transfromValueToFormData = (values: Record<string, any>) => {
  values = cloneDeep(values);

  const deepObj = (obj: Record<string, any>) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];

      if (value?.properties) {
        const properties = value.properties;
        obj[key] = Object.keys(properties).map(k => {
          const val = properties[k];
          return {
            name: k,
            type: val.type,
            description: val.description
          }
        });
        return;
      }

      if (_.isObject(value)) {
        if (!_.isArray(value)) {
          deepObj(value);
        } else {
          value.forEach(deepObj)
        }
      }
    })
  }

  deepObj(values);

  return values;
}
