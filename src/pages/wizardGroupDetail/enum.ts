// Block 类型
export enum BlockTypes {
  FormFields = 'formFields',
  MultipleChoice = 'multipleChoice',
  FileUploader = 'fileUploader',
  Scheduler = 'scheduler',
  ProductCards = 'productCards',
  Confirmation = 'confirmation'
}

// 数据类型
export enum DataTypeEnum {
  String = 'string',
  Array = 'array',
  File = 'file'
}

export const DataTypeMap = {
  [DataTypeEnum.String]: 'Text',
  [DataTypeEnum.Array]: 'List',
  [DataTypeEnum.File]: 'File'
}

// 表单原子类型
export enum FormFieldType {
  Text = 'text',
  Select = 'select',
  MultiSelect = 'multi_select',
  CheckboxItems = 'checkbox_items',
  Elements = 'elements',
  UploadImage = 'image'
}

// 验证类型
export enum ValidateType {
  None = 'none',
  Email = 'email',
  Number = 'number',
  Telephone = 'phone'
}

export const ValidateTypeMap = {
  [ValidateType.None]: 'None', 
  [ValidateType.Email]: 'Email',
  [ValidateType.Number]: 'Number',
  [ValidateType.Telephone]: 'Telephone'
}