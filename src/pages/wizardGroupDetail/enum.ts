import {
  TextAlignLeftIcon,
  TextInRowsIcon,
  ExportIcon,
  CalendarIcon,
  StatusActiveIcon,
  ArchiveIcon
} from '@shopify/polaris-icons';

export enum BlockTypes {
  FormFields = 'formFields',
  MultipleChoice = 'multipleChoice',
  FileUploader = 'fileUploader',
  Scheduler = 'scheduler',
  ProductCards = 'productCards',
  Confirmation = 'confirmation'
}

export const BlockTypesMap = {
  [BlockTypes.FormFields]: {
    label: 'Form Fields',
    icon: TextAlignLeftIcon
  },
  [BlockTypes.MultipleChoice]: {
    label: 'Multiple Choice',
    icon: TextInRowsIcon
  },
  [BlockTypes.FileUploader]: {
    label: 'File Uploader',
    icon: ExportIcon
  },
  [BlockTypes.Scheduler]: {
    label: 'Scheduler',
    icon: CalendarIcon
  },
  [BlockTypes.ProductCards]: {
    label: 'Product Cards',
    icon: ArchiveIcon
  },
  [BlockTypes.Confirmation]: {
    label: 'Confirmation',
    icon: StatusActiveIcon
  }
}

export enum DataTypeEnum {
  String = 'String',
  Array = 'array'
}

export const DataTypeMap = {
  [DataTypeEnum.String]: 'String',
  [DataTypeEnum.Array]: 'Array'
}

export enum FileTypes {
  PDF = 'pdf',
  JPEG = 'jpeg',
  PNG = 'png'
}

export const FileTypeMap = {
  [FileTypes.PDF]: 'PDF',
  [FileTypes.JPEG]: 'JPEG',
  [FileTypes.PNG]: 'PNG'
}

export enum CalendarTypes {
  Hubspot = 'hubspot'
}

export const CalendarTypeMap = {
  [CalendarTypes.Hubspot]: 'Hubspot'
}