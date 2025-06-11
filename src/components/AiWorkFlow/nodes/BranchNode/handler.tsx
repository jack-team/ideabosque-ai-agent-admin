import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { DataType, Conditions } from './types';
import styles from './styles.module.less';

type HandlerProps = DataType & {
  conditions: Conditions;
}

const Handler: FC<HandlerProps> = (props) => {
  const { conditions = [] } = props;

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
      {conditions.map(item => {
        return (
          <div
            key={item.condition}
            className={styles.branch_node_condition}
          >
            <span>{item.label}</span>
            <div className={styles.handle_right} >
              <Handle
                type="source"
                id={item.condition}
                position={Position.Right}
                className={styles.handle}
                isConnectable={props.isConnectable}
              />
              <PlusOutlined />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}

export default Handler;