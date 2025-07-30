import type { FC, PropsWithChildren } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { FlowContext } from './context';
import type { FlowCanvasProps } from './types';

type ProviderProps = PropsWithChildren<
  Omit<FlowCanvasProps,
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
    <FlowContext.Provider
      value={{
        ...rest,
        detailId,
        openDetail,
        closeDetail
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export default Provider;