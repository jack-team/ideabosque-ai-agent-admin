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