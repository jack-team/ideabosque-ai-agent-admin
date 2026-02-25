export enum ToolCallEnum {
  Assistant = 'assistant',
  Developer = 'developer'
}

export const ToolCallMap = {
  [ToolCallEnum.Assistant]: 'common.assistant',
  [ToolCallEnum.Developer]: 'common.developer'
}