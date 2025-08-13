import { shopify } from '@/helper/request';

export const getConfigSettingListApi = (params: Record<string, any>) => {
  return shopify.graphql({
    variables: params,
    query: `
      query getConfigSettingList(
        $shop: String!,
        $settingId: String
      ) {
        configSettingList(
          shop: $shop,
          settingId: $settingId
        ) {
          configSettingList{
            settingId
            settings
          }
        }
      }
    `
  })
}

export const insertUpdateConfigSettingApi = (params: Record<string, any>) => {
  return shopify.graphql({
    variables: params,
    query: `
     mutation insertUpdateConfigSetting(
      $shop: String!,
      $settingId: String!,
      $settings: JSON!
     ) {
        insertUpdateConfigSetting(
            shop: $shop,
            settingId: $settingId,
            settings: $settings,
        ) {
            configSetting{
                settingId
                settings
            }
        }
      }
    `
  })
}