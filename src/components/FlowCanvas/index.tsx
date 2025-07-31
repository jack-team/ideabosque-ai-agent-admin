import { type FC } from "react";
import { ReactFlowProvider } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import Canvas from "./canvas";
import Detail from "./detail";
import Provider from './provider';
import { assembleData } from './helper';
import type { FlowCanvasProps } from './types';
import { useCanvasInctance } from './hooks';
import { useInstanceHandler } from '@/hooks/useInstance';

export * from './hooks';

const FlowCanvas: FC<FlowCanvasProps> = (props) => {
  const [canvas] = useCanvasInctance();

  const getFlowData = useMemoizedFn(() => {
    const details = canvas.getData()!;
    return {
      realDetails: details!,
      assembleData: assembleData(details)
    }
  });

  useInstanceHandler(props.flow, () => {
    return { getData: getFlowData }
  });

  return (
    <ReactFlowProvider>
      <Provider {...props}>
        <Canvas
          {...props}
          canvas={canvas}
        />
        <Detail />
      </Provider>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
