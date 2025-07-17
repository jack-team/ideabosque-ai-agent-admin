import { useSafeState, useMemoizedFn, useMount } from 'ahooks';
import { getLlmListApi } from '@/services/llm';
import { stringify } from './helper';

export const useFetchLlmOptions = () => {
  const [datas, setDatas] = useSafeState<any[]>([]);
  const [loading, setLoading] = useSafeState(true);

  const fetchDatas = useMemoizedFn(async () => {
    const {
      llmList: result
    } = await getLlmListApi({
      pageNumber: 1,
      limit: 1000
    });

    const list = result?.llmList || [];
    const options = list.map((item: any) => {
      return {
        label: item.llmName,
        value: stringify({
          llmName: item.llmName,
          llmProvider: item.llmProvider
        })
      }
    });
    setDatas(options);
    setLoading(false);
  });

  useMount(fetchDatas);

  return [datas, loading] as [any[], boolean];
}