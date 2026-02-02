export const themeSettingListQuery = `
query themeSettingList($themeType: String, $pageNumber: Int, $limit: Int) {
  themeSettingList(
    themeType: $themeType
    pageNumber: $pageNumber
    limit: $limit
  ) {
    pageSize
    pageNumber
    total
    themeSettingList {
      partitionKey
      themeUuid
      themeType
      themeTitle
      themeDescription
      setting
      updatedBy
      createdAt
      updatedAt
    }
  }
}

`;

export const insertUpdateThemeSettingQuery = `
mutation insertUpdateThemeSetting(
  $setting: JSONCamelCase!
  $themeDescription: String
  $themeTitle: String
  $themeType: String!
  $themeUuid: String
  $updatedBy: String
) {
  insertUpdateThemeSetting(
    setting: $setting
    themeDescription: $themeDescription
    themeTitle: $themeTitle
    themeType: $themeType
    themeUuid: $themeUuid
    updatedBy: $updatedBy
  ) {
    themeSetting {
      partitionKey
      themeUuid
      themeType
      themeTitle
      themeDescription
      setting
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const themeSettingQuery = `
query themeSetting($themeUuid: String!) {
  themeSetting(themeUuid: $themeUuid) {
    partitionKey
    themeUuid
    themeType
    themeTitle
    themeDescription
    setting
    updatedBy
    createdAt
    updatedAt
  }
}
`;

export const deleteThemeSettingQuery = `
mutation deleteThemeSetting($themeUuid: String!) {
  deleteThemeSetting(themeUuid: $themeUuid) {
    ok
  }
}
`;