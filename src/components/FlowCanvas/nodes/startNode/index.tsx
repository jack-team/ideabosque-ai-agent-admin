import { CaretRightOutlined } from '@ant-design/icons';
import NodeWrapper from '../../components/NodeWrapper';
import type { CustomNodeFC } from '../types';
import styles from './styles.module.less';

const StartNode: CustomNodeFC = (props) => {
  return (
    <NodeWrapper
      nodeProps={props}
      enableHandle={{ target: false }}
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

StartNode.Icon = CaretRightOutlined;