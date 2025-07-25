import type { FC, PropsWithChildren } from 'react';
import { FlowCanvasContext } from './context';
import type { FlowCanvasContextTypes } from './types';

type ProviderProps = PropsWithChildren<FlowCanvasContextTypes>;

const Provider: FC<ProviderProps> = (props) => {
  const { children, ...rest} = props;
  return (
    <FlowCanvasContext.Provider value={rest}>
      {children}
    </FlowCanvasContext.Provider>
  );
}

export default Provider;