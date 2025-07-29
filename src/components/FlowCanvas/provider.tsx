import type { FC, PropsWithChildren } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { FlowCanvasContext } from './context';
import type { FlowCanvasContextTypes } from './types';

type ProviderProps = PropsWithChildren<
  Omit<FlowCanvasContextTypes,
    'openDetail' |
    'closeDetail'
  >
>;

const Provider: FC<ProviderProps> = (props) => {
  const { children, ...rest } = props;
  const [detailId, setDetailId] = useSafeState<string>();

  const openDetail = useMemoizedFn((id: string) => {
    setDetailId(id);
  });

  const closeDetail = useMemoizedFn(() => {
    setDetailId(undefined);
  });

  return (
    <FlowCanvasContext.Provider
      value={{
        ...rest,
        detailId,
        openDetail,
        closeDetail
      }}
    >
      {children}
    </FlowCanvasContext.Provider>
  );
}

export default Provider;