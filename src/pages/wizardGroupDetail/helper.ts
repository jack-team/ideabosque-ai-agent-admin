import { FormFieldType } from './enum';
import type {
  AttrItem,
  FormOutputType,
  ElementOutputType,
  WizardElementType,
  WizardGroupResultType,
  SchemaFormDataType
} from './types';

const elementTypes = [FormFieldType.Elements, FormFieldType.CheckboxItems];

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
    element_uuid: data.element_uuid,
    element: {
      priority: 1,
      conditions: [],
      pattern: data.pattern || '',
      data_type: data.data_type,
      element_title: data.element_title,
      attribute_type: data.attribute_type,
      option_values: data.option_values,
      attribute_name: generateSlug(data.element_title),
    }
  }
}

const getElementFormData = (data: WizardElementType) => {
  const element = data.element;
  return <ElementOutputType>{
    required: data.required,
    pattern: element.pattern || undefined,
    data_type: element.data_type || undefined,
    placeholder: data.placeholder || undefined,
    option_values: element.option_values || [],
    element_uuid: element.element_uuid || undefined,
    element_title: element.element_title || undefined,
    attribute_name: element.attribute_name || undefined,
    attribute_type: element.attribute_type || undefined
  }
}

// 处理数据
export const processOutputData = (output: FormOutputType) => {
  const wizards = output.wizards.map(item => {
    const {
      wizardSchemaType,
      wizardSchemaName,
      schemaFormData: formData,
      ...rest
    } = item;

    const wizardAttrs: AttrItem[] = [];
    const wizardElements: WizardElementType[] = [];

    for (const key of Object.keys(formData)) {
      const detail = formData[key];
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
      wizard_type: 'form',
      wizard_attributes: wizardAttrs,
      wizard_elements: wizardElements,
      wizard_schema_type: wizardSchemaType,
      wizard_schema_name: wizardSchemaName,
    }
  });

  return {
    ...output,
    wizards
  }
}

//formdata 数组组装
export const getInitFormData = (data: WizardGroupResultType) => {
  const { wizards, ...rest } = data;

  const _wizards = wizards.map(item => {
    const {
      wizard_elements,
      wizard_schema: schema,
      wizard_attributes: dataList,
      ...rest
    } = item;

    const {
      attributes,
      attribute_groups: attributeGroups,
      wizard_schema_type: wizardSchemaType,
      wizard_schema_name: wizardSchemaName,
      wizard_schema_description: wizardSchemaDescription
    } = schema;

    const schemaFormData = attributes.reduce((pre, cur) => {
      const result = dataList.find(e => e.name === cur.name);
      const type = cur.attribute_type;

      const val = !elementTypes.includes(type) ?
        result?.value :
        wizard_elements.map(getElementFormData);

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