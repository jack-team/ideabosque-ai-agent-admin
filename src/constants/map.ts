import { StatusEnum, ToolCallEnum } from './enum';

export const StatusMap = {
  [StatusEnum.Active]: 'Active',
  [StatusEnum.Inactive]: 'Inactive'
}

export const ToolCallMap = {
  [ToolCallEnum.Assistant]: 'Assistant',
  [ToolCallEnum.Developer]: 'Developer'
}