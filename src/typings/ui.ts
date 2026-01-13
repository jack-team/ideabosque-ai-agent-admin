import type { ParameterType } from './common';

export type UiComponentDataType = {
  waitFor: string;
  createdAt: string;
  updatedAt: string;
  tagName: string;
  uiComponentType: string;
  uiComponentUuid: string;
  parameters: ParameterType[];
}