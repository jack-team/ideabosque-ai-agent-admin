import { type FC } from "react";
import Canvas from "./canvas";
import Provider from './provider';
import type { FlowCanvasProps } from './types';
import styles from './styles.module.less';

const FlowCanvas: FC<FlowCanvasProps> = (props) => {
  return (
    <div className={styles.container}>
      <Provider {...props}>
        <Canvas />
      </Provider>
    </div>
  );
};

export default FlowCanvas;
