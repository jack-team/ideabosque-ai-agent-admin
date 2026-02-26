export enum PromptTypes {
  Prompt = 'prompt',
  Text = 'text'
}

export const PromptTypesMap = {
  [PromptTypes.Prompt]: 'flowCanvas.prompt',
  [PromptTypes.Text]: 'flowCanvas.Text response'
}