import { apiCore, getSplitPageParams } from '@/utils/api';
import type { UiComponentDataType } from '@/typings/ui';
import { uiComponentListQuery, insertUpdateUiComponentQuery, deleteUiComponentQuery } from '@/graphql/uiCpt';

export const uiComponentListApi = (params: SplitPageParams) => {
  return apiCore.graphql<UiComponentDataType[]>({
    query: uiComponentListQuery,
    variables: getSplitPageParams(params)
  });
}

export const insertUpdateUiComponentApi = (params: Record<string, any>) => {
  return apiCore.graphql<UiComponentDataType[]>({
    query: insertUpdateUiComponentQuery,
    variables: params
  });
}

export const deleteUiComponentApi = (params: {
  uiComponentType: string;
  uiComponentUuid: string;
}) => {
  return apiCore.graphql<{}>({
    query: deleteUiComponentQuery,
    variables: params
  });
}