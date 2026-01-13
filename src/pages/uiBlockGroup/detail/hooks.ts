import { useRequest, useMemoizedFn } from 'ahooks';
import { getWizardSchemaListApi, getElementsApi, getWizardGroupApi } from '@/services/wizardGroup';

// 获取block schemas
export const useBlockSchemas = () => {
  const {
    data,
    loading
  } = useRequest(getWizardSchemaListApi);

  return {
    loading,
    wizardSchemas: data?.data || []
  };
}

// 获取 elements
export const useElements = () => {
  const {
    data,
    loading,
    runAsync
  } = useRequest(async (params) => {
    return getElementsApi({ current: 1, pageSize: 1000, ...params });
  });

  const refreshData = useMemoizedFn((params?: Record<string, any>) => {
    return runAsync(params);
  });

  const elementOptions = data?.data?.map(
    (item: Record<string, any>) => {
      return {
        realData: item,
        label: item.elementTitle,
        value: item.elementUuid
      }
    }
  ) || []

  return {
    loading,
    refreshData,
    elementOptions
  };
}

// 获取详情
export const useWizardGroupDetail = (id: string) => {
  const {
    data: detail,
    loading: detailLoading
  } = useRequest(async () => {
    return getWizardGroupApi({ wizardGroupUuid: id });
  }, { refreshDeps: [id] });

  return {
    detail,
    detailLoading
  }
}