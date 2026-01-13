export const wizardGroupListQuery = `
  query wizardGroupList(
      $pageNumber: Int
      $limit: Int
      $wizardGroupName: String
      $updatedAtGt: DateTime
      $updatedAtLt: DateTime
  ){
    wizardGroupList(
      pageNumber: $pageNumber
      limit: $limit
      wizardGroupName: $wizardGroupName
      updatedAtGt: $updatedAtGt
      updatedAtLt: $updatedAtLt
    ) {
      pageSize
      pageNumber
      total
      wizardGroupList {
        partitionKey
        endpointId
        partId
        wizardGroupUuid
        wizardGroupName
        wizardGroupDescription
        weight
        updatedBy
        createdAt
        updatedAt
      }
    }
  }
`;

export const insertUpdateWizardGroupQuery = `
  mutation insertUpdateWizardGroup(
    $updatedBy: String!
    $weight: Int
    $wizardGroupDescription: String
    $wizardGroupName: String!
    $wizardGroupUuid: String  
  ){
    insertUpdateWizardGroup(
      updatedBy: $updatedBy
      weight: $weight
      wizardGroupDescription: $wizardGroupDescription
      wizardGroupName: $wizardGroupName
      wizardGroupUuid: $wizardGroupUuid
    ) {
      wizardGroup {
        partitionKey
        endpointId
        partId
        wizardGroupUuid
        wizardGroupName
        wizardGroupDescription
        weight
        wizardUuids
        updatedBy
        createdAt
        updatedAt
        wizards
      }
    }
  }
`;

export const insertUpdateWizardGroupWithWizardsQl = `
  mutation insertUpdateWizardGroupWithWizards(
    $updatedBy: String!
    $weight: Int
    $wizardGroupDescription: String
    $wizardGroupName: String!
    $wizardGroupUuid: String
    $wizards: [JSON]!
  ){
    insertUpdateWizardGroupWithWizards(
      updatedBy: $updatedBy
      weight: $weight
      wizardGroupDescription: $wizardGroupDescription
      wizardGroupName: $wizardGroupName
      wizardGroupUuid: $wizardGroupUuid
      wizards: $wizards
    ) {
      wizardGroup {
        partitionKey
        endpointId
        partId
        wizardGroupUuid
        wizardGroupName
        wizardGroupDescription
        weight
        wizardUuids
        updatedBy
        createdAt
        updatedAt
        wizards
      }
    }
  }
`;

export const wizardSchemaListQuery = `
  query wizardSchemaList(
      $pageNumber: Int
      $limit: Int
      $wizardSchemaType: String
      $wizardSchemaName: String
      $updatedAtGt: DateTime
      $updatedAtLt: DateTime
  ){
    wizardSchemaList(
      pageNumber: $pageNumber
      limit: $limit
      wizardSchemaType: $wizardSchemaType
      wizardSchemaName: $wizardSchemaName
      updatedAtGt: $updatedAtGt
      updatedAtLt: $updatedAtLt
    ) {
      pageSize
      pageNumber
      total
      wizardSchemaList {
        wizardSchemaType
        wizardSchemaName
        wizardSchemaDescription
        attributes
        attributeGroups
        updatedBy
        createdAt
        updatedAt
      }
    }
  }
`;


export const elementListQuery = `
query elementList(
    $pageNumber: Int
    $limit: Int
    $dataType: String
    $attributeName: String
    $updatedAtGt: DateTime
    $updatedAtLt: DateTime
){
  elementList(
    pageNumber: $pageNumber
    limit: $limit
    dataType: $dataType
    attributeName: $attributeName
    updatedAtGt: $updatedAtGt
    updatedAtLt: $updatedAtLt
  ) {
    pageSize
    pageNumber
    total
    elementList {
      partitionKey
      endpointId
      partId
      elementUuid
      dataType
      elementTitle
      priority
      attributeName
      attributeType
      optionValues
      conditions
      pattern
      updatedBy
      createdAt
      updatedAt
    }
  }
}
`;

export const wizardGroupQuery = `
  query wizardGroup(
    $wizardGroupUuid: String!
  ){
    wizardGroup(wizardGroupUuid: $wizardGroupUuid) {
      partitionKey
      endpointId
      partId
      wizardGroupUuid
      wizardGroupName
      wizardGroupDescription
      weight
      wizardUuids
      updatedBy
      createdAt
      updatedAt
      wizards
    }
  }
`;

export const deleteWizardGroupQuery = `
  mutation deleteWizardGroup(
    $wizardGroupUuid: String!
  ){
    deleteWizardGroup(wizardGroupUuid: $wizardGroupUuid) {
      ok
    }
  }
`;