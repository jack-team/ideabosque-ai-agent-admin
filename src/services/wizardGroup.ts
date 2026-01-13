import { apiCore, getSplitPageParams } from '@/utils/api';

import type {
  WizardGroupResultType,
  WizardSchemaType,
  WizardElementType
} from '@/typings/wizardGroup';

import {
  wizardGroupListQuery,
  insertUpdateWizardGroupQuery,
  insertUpdateWizardGroupWithWizardsQl,
  wizardSchemaListQuery,
  elementListQuery,
  wizardGroupQuery,
  deleteWizardGroupQuery
} from '@/graphql/wizardGroup';

export const wizardGroupListApi = (params: SplitPageParams) => {
  return apiCore.graphql<WizardGroupResultType[]>({
    camelize: false,
    query: wizardGroupListQuery,
    variables: getSplitPageParams(params)
  });
}

export const getWizardGroupApi = (params: {
  wizardGroupUuid: string;
}) => {
  return apiCore.graphql<WizardGroupResultType>({
    query: wizardGroupQuery,
    variables: params,
    camelize: false
  });
}

export const insertUpdateWizardGroupApi = (params: Record<string, any>) => {
  return apiCore.graphql<{ wizardGroup: WizardGroupResultType }>({
    camelize: false,
    query: insertUpdateWizardGroupQuery,
    variables: params
  });
}

export const insertUpdateWizardGroupWithWizards = (params: Record<string, any>) => {
  return apiCore.graphql<{ wizardGroup: WizardGroupResultType }>({
    camelize: false,
    query: insertUpdateWizardGroupWithWizardsQl,
    variables: params
  });
}

export const getWizardSchemaListApi = () => {
  return apiCore.graphql<WizardSchemaType[]>({
    query: wizardSchemaListQuery,
    camelize: false,
  });
}

export const getElementsApi = async (params: SplitPageParams) => {
  return apiCore.graphql<WizardElementType[]>({
    camelize: false,
    query: elementListQuery,
    variables: getSplitPageParams(params)
  });
}

export const deleteWizardGroupApi = (params: {
  wizardGroupUuid: string;
}) => {
  return apiCore.graphql<{}>({
    camelize: false,
    query: deleteWizardGroupQuery,
    variables: params
  });
}