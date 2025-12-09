import type { ProFormListProps } from '@ant-design/pro-components';
import type { FormFieldType } from './enum'

export type OptionType = {
  label: string;
  value: string;
}

export type AttrItem = {
  name: string;
  value: string;
}

export type AttributeGroupType = {
  name: string;
  label: string;
}

export type AttributeType = {
  attribute_type: FormFieldType;
  group_name: string;
  col: string;
  label?: string;
  name: string;
  extra?: string;
  options?: OptionType[];
  pattern: string;
  required: boolean;
}

export type WizardSchemaType = {
  wizardSchemaType: string;
  wizardSchemaName: string;
  wizardSchemaDescription: string;
  updatedAt: string;
  createdAt: string;
  attributes: AttributeType[];
  attributeGroups: AttributeGroupType[];
}

export type FormListAction = Parameters<
  Extract<NonNullable<ProFormListProps<WizardSchemaType>['children']>, Function>
>[2];

export type SchemaFormDataType = Record<string, {
  type: AttributeType['attribute_type'];
  value?: string | ElementOutputType[];
}>

export type WizardOutput = WizardSchemaType & {
  schemaFormData: SchemaFormDataType;
}

export type FormOutputType = {
  wizardGroupName: string;
  wizardGroupUuid?: string;
  wizardGroupDescription: string;
  weight: number;
  wizards: WizardOutput[];
}

export type ElementOutputType = {
  element_title: string;
  attribute_type: string;
  attribute_name: string;
  data_type: string;
  element_uuid?: string
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  option_values?: AttrItem[];
}

export type WizardElementType = {
  required?: boolean;
  placeholder?: string;
  element: {
    element_uuid?: string;
    priority: number;
    conditions: OptionType[];
    pattern?: string;
    data_type: string;
    element_title: string;
    attribute_name: string;
    attribute_type: string;
    option_values: AttrItem[];
  }
}

export type WizardType = {
  priority: number;
  wizard_title: string;
  wizard_type: string;
  wizard_uuid: string;
  wizard_attributes: AttrItem[];
  wizard_description: string;
  wizard_elements: WizardElementType[];
  wizard_schema: {
    attribute_groups: AttributeGroupType[];
    attributes: AttributeType[];
    wizard_schema_description: string;
    wizard_schema_name: string;
    wizard_schema_type: string;
  }
}

export type WizardGroupResultType = {
  createdAt: string;
  endpointId: string;
  updatedAt: string;
  updatedBy: string;
  weight: number;
  wizardGroupName: string;
  wizardGroupUuid: string;
  wizardGroupDescription: string;
  wizards: WizardType[];
}