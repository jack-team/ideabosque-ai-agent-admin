import { StatusEnum, ToolCallEnum, WizardTypesEnum, RegionEnmu } from './enum';

export const StatusMap = {
  [StatusEnum.Active]: 'Active',
  [StatusEnum.Inactive]: 'Inactive'
}

export const ToolCallMap = {
  [ToolCallEnum.Assistant]: 'Assistant',
  [ToolCallEnum.Developer]: 'Developer'
}

export const WizardTypesMap = {
  [WizardTypesEnum.Form]: 'Form',
  [WizardTypesEnum.Iframe]: 'Iframe',
  [WizardTypesEnum.Page]: 'Page'
}

export const RegionMap = {
  [RegionEnmu.US]: 'US'
}