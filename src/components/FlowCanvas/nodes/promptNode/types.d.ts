import { PromptTypesMap } from './enum';

export type PromptNodeFormData = {
  type: keyof typeof PromptTypesMap;
  text: string;
}