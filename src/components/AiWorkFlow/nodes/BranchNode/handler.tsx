import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { Conditions } from './types';
import type { DataType } from '../../components/NodeLayout/types';
import styles from './styles.module.less';

type HandlerProps = DataType & {
  conditions: Conditions;
}

const Handler: FC<HandlerProps> = (props) => {
  const { conditions = [] } = props;
  return (
    <Fragment>
      {!props.isFirstNode && (
        <div className="flow_handle_left">
          <Handle
            type="target"
            position={Position.Left}
            className="flow_handle"
            isConnectable={props.isConnectable}
          />
        </div>
      )}
      <div className={styles.conditions}>
        {conditions.map(item => {
          return (
            <div
              key={item.condition}
              className={styles.condition_handle}
            >
              <span>{item.label}</span>
              <div className="flow_handle_right">
                <Handle
                  type="source"
                  id={item.condition}
                  position={Position.Right}
                  className="flow_handle"
                  isConnectable={props.isConnectable}
                />
                <PlusOutlined />
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default Handler;