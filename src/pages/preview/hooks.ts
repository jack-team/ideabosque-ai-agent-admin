import { useRequest } from 'ahooks';
import { requestWrapper } from '@/utils';
import { getCoordinationsApi } from '@/services/contactProfiles';
import { getAiEndpoint } from '@/libs/graphql'

type CoordinationItem = {
  label: string;
  value: string;
  agents: any[];
}

export const useCoordinationList = () => {
  return useRequest(async () => {
    const result = await requestWrapper(getCoordinationsApi);
    const list = result?.coordinationList?.coordinationList;
    return list.map((item: any) => {
      return {
        agents: item.agents,
        label: item.coordinationName,
        value: item.coordinationUuid
      }
    }) as CoordinationItem[];
  });
}

export const useEndpointId = () => {
  return getAiEndpoint();
}