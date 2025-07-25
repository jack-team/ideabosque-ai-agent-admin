import { type FC } from "react";
import Canvas from "./canvas";
import Provider from './provider';
import type { FlowCanvasProps } from './types'

const FlowCanvas: FC<FlowCanvasProps> = (props) => {
  return (
    <Provider {...props}>
      <Canvas />
    </Provider>
  );
};

export default FlowCanvas;
