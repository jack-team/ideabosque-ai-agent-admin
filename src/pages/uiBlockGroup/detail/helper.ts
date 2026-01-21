import { FormFieldType } from './enum';
import type {
  AttrItem,
  FormOutputType,
  ElementOutputType,
  WizardElementType,
  WizardGroupResultType,
  SchemaFormDataType
} from './types';

const elementTypes = [
  FormFieldType.Elements,
  FormFieldType.CheckboxItems
];

export function getNestedValue(data: Record<string, any>, paths: string[]) {
  return paths.reduce((current, key) => current?.[key], data);
}

function generateSlug(str: string) {
  return str.trim().toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '_')
    .replace(/^_|_$/g, '');
}

const getInputElementData = (data: ElementOutputType) => {
  return <WizardElementType>{
    required: data.required,
    placeholder: data.placeholder,
    elementUuid: data.elementUuid,
    element: {
      priority: 1,
      conditions: [],
      pattern: data.pattern || '',
      dataType: data.dataType,
      elementTitle: data.elementTitle,
      attributeType: data.attributeType,
      optionValues: data.optionValues,
      attributeName: generateSlug(data.elementTitle),
    }
  }
}

const getElementFormData = (data: WizardElementType) => {
  const element = data.element;
  return <ElementOutputType>{
    required: data.required,
    pattern: element.pattern || undefined,
    dataType: element.dataType || undefined,
    placeholder: data.placeholder || undefined,
    optionValues: element.optionValues || [],
    elementUuid: element.elementUuid || undefined,
    elementTitle: element.elementTitle || undefined,
    attributeName: element.attributeName || undefined,
    attributeType: element.attributeType || undefined
  }
}

// 处理数据
export const processOutputData = (output: FormOutputType) => {
  const wizards = output.wizards.map(item => {
    const { schemaFormData, ...rest } = item;

    const wizardAttrs: AttrItem[] = [];
    const wizardElements: WizardElementType[] = [];

    for (const key of Object.keys(schemaFormData)) {
      const detail = schemaFormData[key];
      if (elementTypes.includes(detail.type)) {
        const eles = detail.value as ElementOutputType[];
        eles.forEach(el => wizardElements.push(getInputElementData(el)));
      } else {
        wizardAttrs.push({ name: key, value: detail.value as string });
      }
    }

    return {
      ...rest,
      priority: 1,
      wizardType: 'form',
      wizardAttributes: wizardAttrs,
      wizardElements: wizardElements
    }
  });

  return {
    ...output,
    wizards
  }
}

//formdata 数组组装
export const getInitFormData = (data: WizardGroupResultType) => {
  const { wizardItems, ...rest } = data;

  const _wizards = wizardItems.map(item => {
    const {
      wizardElements,
      wizardSchema: schema,
      wizardAttributes: dataList,
      ...rest
    } = item;

    const {
      attributes,
      attributeGroups: attributeGroups,
      wizardSchemaType: wizardSchemaType,
      wizardSchemaName: wizardSchemaName,
      wizardSchemaDescription: wizardSchemaDescription
    } = schema;

    const schemaFormData = attributes.reduce((pre, cur) => {
      const result = dataList.find(e => e.name === cur.name);
      const type = cur.attributeType;

      const val = !elementTypes.includes(type) ?
        result?.value :
        wizardElements.map(getElementFormData);

      return { ...pre, [cur.name]: { value: val, type } };
    }, {} as SchemaFormDataType);

    return {
      ...rest,
      attributes,
      schemaFormData,
      attributeGroups,
      wizardSchemaType,
      wizardSchemaName,
      wizardSchemaDescription,
    }
  });

  return {
    ...rest,
    wizards: _wizards
  }
}