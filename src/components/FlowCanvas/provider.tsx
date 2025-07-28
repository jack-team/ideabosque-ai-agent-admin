import type { FC, PropsWithChildren } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { FlowCanvasContext } from './context';
import type { FlowCanvasContextTypes, NodeDataType } from './types';

type ProviderProps = PropsWithChildren<FlowCanvasContextTypes>;

const Provider: FC<ProviderProps> = (props) => {
  const { children, ...rest } = props;
  const [cache, setCache] = useSafeState<Record<string, NodeDataType>>({});

  const saveCacheNodeDatas = useMemoizedFn(
    (id: string, data: NodeDataType) => {
      setCache({ ...cache, [id]: data });
    }
  );

  const ctxValue = {
    ...rest,
    saveCacheNodeDatas,
    cacheNodeDatas: cache,
  };

  return (
    <FlowCanvasContext.Provider value={ctxValue}>
      {children}
    </FlowCanvasContext.Provider>
  );
}

export default Provider;