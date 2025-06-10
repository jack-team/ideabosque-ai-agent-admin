import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { NodeComponent } from '../../types';
import styles from './styles.module.less';

type DataType = {
  componentName: string;
  componentTitle: string;
  waitFor: string;
  isConnectable?: boolean;
}


const UiComponent: NodeComponent<DataType> = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      <div className={styles.handle_left}>
        <Handle
          type="target"
          position={Position.Left}
          className={styles.handle}
          isConnectable={data.isConnectable}
        />
      </div>
      <div className={styles.handle_right}>
        <Handle
          type="source"
          position={Position.Right}
          className={styles.handle}
          isConnectable={data.isConnectable}
        />
        <PlusOutlined />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          {data.componentName}
        </div>
        <div className={styles.title}>
          {data.componentTitle}
        </div>
        <div className={styles.wait_for}>
          Wait For: {data.waitFor}
        </div>
      </div>
    </div>
  );
}

export default UiComponent;