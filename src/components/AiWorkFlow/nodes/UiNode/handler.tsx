import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { DataType } from './types';
import styles from './styles.module.less';

const Handler: FC<DataType> = (props) => {
  return (
    <Fragment>
      {!props.isFirstNode && (
        <div className={styles.handle_left}>
          <Handle
            type="target"
            position={Position.Left}
            className={styles.handle}
            isConnectable={props.isConnectable}
          />
        </div>
      )}
      <div className={styles.handle_right}>
        <Handle
          type="source"
          position={Position.Right}
          className={styles.handle}
          isConnectable={props.isConnectable}
        />
        <PlusOutlined />
      </div>
    </Fragment>
  );
}

export default Handler;