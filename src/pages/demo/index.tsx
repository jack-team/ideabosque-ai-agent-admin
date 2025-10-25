import type { FC } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import styles from './styles.module.less';


const Demo: FC = () => {
  const { ref } = useResizeDetector<HTMLDivElement>();

  return (
    <div className={styles.container} ref={ref}>
      demo
    </div>
  );
}

export default Demo;