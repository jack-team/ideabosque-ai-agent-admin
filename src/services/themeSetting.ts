import { settingCore, getSplitPageParams } from '@/utils/api';
import {
  themeSettingListQuery,
  insertUpdateThemeSettingQuery
} from '@/graphql/themeSetting';

import type { 
  ThemeSettingDataType
} from '@/typings/themeSetting';

export const getThemeSettingListApi = (
  params: SplitPageParams<{
    themeType?: string;
  }>
) => settingCore.graphql<ThemeSettingDataType[]>({
  query: themeSettingListQuery,
  variables: getSplitPageParams(params)
});

export const insertUpdateThemeSettingApi = (
  params: Record<string, any>
) => settingCore.graphql<ThemeSettingDataType>({
  query: insertUpdateThemeSettingQuery,
  variables: params
});