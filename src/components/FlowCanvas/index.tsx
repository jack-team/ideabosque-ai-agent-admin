import { type FC } from "react";
import { ReactFlowProvider } from '@xyflow/react';
import Canvas from "./canvas";
import Detail from "./detail";
import Provider from './provider';
import type { FlowCanvasProps } from './types';

const FlowCanvas: FC<FlowCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <Provider {...props}>
        <Canvas />
        <Detail />
      </Provider>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
