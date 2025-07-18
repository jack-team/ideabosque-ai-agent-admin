import { TemplateType, TemplateStatus } from './enum';

export const TemplateTypeMap = {
  [TemplateType.SystemPrompt]: 'System prompt'
}

export const TemplateStatusMap = {
  [TemplateStatus.Active]: 'Active',
  [TemplateStatus.Inactive]: 'Inactive'
}