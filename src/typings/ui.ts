import type { ParameterType } from './common';

export type UiComponentDataType = {
  waitFor: string;
  createdAt: string;
  updatedAt: string;
  tagName: string;
  tagAlias: string;
  uiComponentType: string;
  uiComponentUuid: string;
  parameters: ParameterType[];
}