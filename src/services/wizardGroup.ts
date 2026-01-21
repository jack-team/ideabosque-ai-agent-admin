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
    query: wizardGroupListQuery,
    variables: getSplitPageParams(params)
  });
}

export const getWizardGroupApi = (params: {
  wizardGroupUuid: string;
}) => {
  return apiCore.graphql<WizardGroupResultType>({
    query: wizardGroupQuery,
    variables: params
  });
}

export const insertUpdateWizardGroupApi = (params: Record<string, any>) => {
  return apiCore.graphql<{ wizardGroup: WizardGroupResultType }>({
    query: insertUpdateWizardGroupQuery,
    variables: params
  });
}

export const insertUpdateWizardGroupWithWizards = (params: Record<string, any>) => {
  return apiCore.graphql<{ wizardGroup: WizardGroupResultType }>({
    query: insertUpdateWizardGroupWithWizardsQl,
    variables: params
  });
}

export const getWizardSchemaListApi = () => {
  return apiCore.graphql<WizardSchemaType[]>({
    query: wizardSchemaListQuery
  });
}

export const getElementsApi = async (params: SplitPageParams) => {
  return apiCore.graphql<WizardElementType[]>({
    query: elementListQuery,
    variables: getSplitPageParams(params)
  });
}

export const deleteWizardGroupApi = (params: {
  wizardGroupUuid: string;
}) => {
  return apiCore.graphql<{}>({
    query: deleteWizardGroupQuery,
    variables: params
  });
}