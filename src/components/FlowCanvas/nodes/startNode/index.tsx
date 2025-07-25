import type { FC } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import type { CustomNodeProps } from '../../types';
import styles from './styles.module.less';

const StartNode: FC<CustomNodeProps> = (props) => {
  return (
    <NodeWrapper
      enableHandle={{
        target: false
      }}
      showTool={false}
      nodeProps={props}
      nodeId={props.id}
    >
      <div className={styles.container}>
        <div className={styles.icon}>
          <CaretRightOutlined />
        </div>
        <div className={styles.text}>
          Start
        </div>
      </div>
    </NodeWrapper>
  );
}

export default StartNode;