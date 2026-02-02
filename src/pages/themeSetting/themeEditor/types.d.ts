import { ThemeSettingDataType } from '@/typings/themeSetting';

export type SdkVariables = {
  updateThemeConfigs: (values: Record<string, any>) => void;
}

export type ThemeEditorActionType = {
  getThemeData: () => ThemeSettingDataType['setting'];
}

export type ThemeEditorProps = {
  themeData: ThemeSettingDataType['setting'];
}