import { useEffect, useRef } from 'react';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';

type ServiceResult<Record = any> = {
  data: Record[];
}

type ServiceParams = {
  page: number;
  pageSize: number;
}

export type ServiceType<Record = any> = (
  params: ServiceParams
) => Promise<ServiceResult<Record>>;

export type OptionsType = {
  pageSize?: number;
  autoRequest?: boolean;
}

export type SetPageListener = () => void;
export type SetStateAction<S = any> = S | ((s: S) => S);

export const usePage = (initValue = 1) => {
  const [page, setPage] = useSafeState(initValue);
  const [updateId, setUpdateId] = useSafeState<number>();
  const listenerRef = useRef<SetPageListener | undefined>(null);

  const onUpdate = useMemoizedFn(() => {
    setUpdateId(Date.now());
  });

  const setPageHandler = useMemoizedFn((
    action: SetStateAction<number>,
    listener?: SetPageListener
  ) => {
    onUpdate();
    setPage(action);
    listenerRef.current = listener;
  });

  useUpdateEffect(() => {
    listenerRef.current?.();
  }, [page, updateId]);

  return [page, setPageHandler] as [number, typeof setPageHandler];
}

export function useLoadMore<Record = any>(service: ServiceType, options?: OptionsType) {
  // options
  const pageSize = options?.pageSize || 15;
  const autoRequest = options?.autoRequest ?? true;

  //states
  const [page, setPage] = usePage(1);
  const [noMore, setNoMore] = useSafeState(false);
  const [loading, setLoading] = useSafeState(true);
  let [records, setRecords] = useSafeState<Record[]>([]);
  const empty = !loading && page === 1 && !records.length;
  const initLoading = page === 1 && loading;

  const onFetch = useMemoizedFn(async () => {
    setLoading(true);

    try {
      const result = await service({
        page,
        pageSize
      });

      const list = result.data || [];

      if (page > 1) {
        records = [...records, ...list];
      } else {
        records = list;
      }

      setLoading(false);
      setRecords([...records]);
      // 返回的数据比 pageSize 小，说明已无数据
      const noMore = list.length < pageSize;
      if (!noMore) setPage(page => page + 1);
      setNoMore(noMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  const onLoadMore = useMemoizedFn(async () => {
    if (noMore || loading || page === 1) return;
    return onFetch();
  });

  const onRefresh = useMemoizedFn(() => {
    setPage(1, onFetch);
  });

  useEffect(() => {
    if (autoRequest) {
      onFetch();
    }
  }, [autoRequest]);

  return {
    page,
    empty,
    noMore,
    records,
    loading,
    initLoading,
    onRefresh,
    onLoadMore
  }
}

export default useLoadMore;