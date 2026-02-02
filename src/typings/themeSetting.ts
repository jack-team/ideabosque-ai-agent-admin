type DefaultThemeData = Record<
  'basic' | 'components',
  Record<string, any>
>;

export type SettingDataType = DefaultThemeData & {
  openMode: OpenModeType;
  position: BubblePositionType;
}

export type ThemeSettingDataType = {
  setting: SettingDataType;
  themeTitle: string;
  themeDescription: string;
  createdAt: string;
  updatedAt: string;
  themeUuid: string;
}