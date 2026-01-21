export const uiComponentListQuery = `
 query uiComponentList(
    $pageNumber: Int
    $limit: Int
    $uiComponentType: String
    $tagName: String
    $updatedAtGt: DateTime
    $updatedAtLt: DateTime
){
  uiComponentList(
    pageNumber: $pageNumber
    limit: $limit
    uiComponentType: $uiComponentType
    tagName: $tagName
    updatedAtGt: $updatedAtGt
    updatedAtLt: $updatedAtLt
  ) {
    pageSize
    pageNumber
    total
    uiComponentList {
      uiComponentType
      uiComponentUuid
      tagName
      parameters
      waitFor
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const insertUpdateUiComponentQuery = `
mutation insertUpdateUiComponent(
    $parameters: [JSONCamelCase]
    $tagName: String!
    $uiComponentType: String!
    $uiComponentUuid: String
    $updatedBy: String!
    $waitFor: String
){
  insertUpdateUiComponent(
    parameters: $parameters
    tagName: $tagName
    uiComponentType: $uiComponentType
    uiComponentUuid: $uiComponentUuid
    updatedBy: $updatedBy
    waitFor: $waitFor
  ) {
    uiComponent {
      uiComponentType
      uiComponentUuid
      tagName
      parameters
      waitFor
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const deleteUiComponentQuery = `
mutation deleteUiComponent($uiComponentType: String!, $uiComponentUuid: String!) {
  deleteUiComponent(
    uiComponentType: $uiComponentType
    uiComponentUuid: $uiComponentUuid
  ) {
    ok
  }
}
`;