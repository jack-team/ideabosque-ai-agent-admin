import { useRequest, useMemoizedFn } from 'ahooks';
import { getWizardSchemaList, getElementsApi, getWizardGroupApi } from '@/services/wizard';

// 获取block schemas
export const useBlockSchemas = () => {
  const {
    loading,
    data: wizardSchemas = []
  } = useRequest(async () => {
    const {
      wizardSchemaList: result
    } = await getWizardSchemaList();
    return result?.wizardSchemaList || [];
  });

  return {
    loading,
    wizardSchemas
  };
}

// 获取 elements
export const useElements = () => {
  const {
    loading,
    runAsync,
    data: elementList = [],
  } = useRequest(async (params) => {
    const {
      elementList: result
    } = await getElementsApi({ pageNumber: 1, limit: 1000, ...params });
    return result?.elementList || [];
  });

  const refreshData = useMemoizedFn((params?: Record<string, any>) => {
    return runAsync(params);
  });

  const elementOptions = elementList.map(
    (item: Record<string, any>) => {
      return {
        realData: item,
        label: item.elementTitle,
        value: item.elementUuid
      }
    }
  )

  return {
    refreshData,
    loading,
    elementOptions
  };
}

// 获取详情
export const useWizardGroupDeail = (id: string) => {
  const {
    loading,
    data: detail,
  } = useRequest(async () => {
    const result = await getWizardGroupApi({ wizardGroupUuid: id });
    return result.wizardGroup;
  }, { refreshDeps: [id] });

  return {
    detail,
    detailLoading: loading
  }
}