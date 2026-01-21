import type { ProFormListProps } from '@ant-design/pro-components';
import type { FormFieldType } from '@/pages/uiBlockGroup/detail/enum';

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
  attributeType: FormFieldType;
  groupName: string;
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
  type: AttributeType['attributeType'];
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
  elementTitle: string;
  attributeType: string;
  attributeName: string;
  dataType: string;
  elementUuid?: string
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  optionValues?: AttrItem[];
}

export type WizardElementType = {
  required?: boolean;
  placeholder?: string;
  element: {
    elementUuid?: string;
    priority: number;
    conditions: OptionType[];
    pattern?: string;
    dataType: string;
    elementTitle: string;
    attributeName: string;
    attributeType: string;
    optionValues: AttrItem[];
  }
}

export type WizardType = {
  priority: number;
  wizardTitle: string;
  wizardType: string;
  wizardUuid: string;
  wizardAttributes: AttrItem[];
  wizardDescription: string;
  wizardElements: WizardElementType[];
  wizardSchema: {
    attributeGroups: AttributeGroupType[];
    attributes: AttributeType[];
    wizardSchemaDescription: string;
    wizardSchemaName: string;
    wizardSchemaType: string;
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
  wizardItems: WizardType[];
}