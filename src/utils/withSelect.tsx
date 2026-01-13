import { type FC, forwardRef, useImperativeHandle } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';

export type SelectActionType = {
  resetData: () => void;
  setData: (options: any[]) => void;
}

export function withSelect<P = {}>(Component: FC<P>) {
  return forwardRef<SelectActionType, P>((props, ref) => {
    const [options, setOptions] = useSafeState<any[]>([]);
    const resetOptions = useMemoizedFn(() => setOptions([]));

    useImperativeHandle(ref, () => ({
      setData: setOptions,
      resetData: resetOptions
    }));

    //@ts-ignore
    return <Component {...props} options={options} />;
  })
}
