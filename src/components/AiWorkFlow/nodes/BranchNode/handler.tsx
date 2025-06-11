import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { Conditions } from './types';
import type { NodeProps } from '../../components/NodeLayout/types';
import { ConnectionTypes } from '../../const';
import styles from './styles.module.less';

type HandlerProps = NodeProps & {
  conditions: Conditions;
}

const Handler: FC<HandlerProps> = (props) => {
  const {
    conditions = [],
    isConnectable,
  } = props;

  const {
    connectionEnable = true,
    connectionTypes = Object.keys(ConnectionTypes)
  } = props.data;

  const showTarget = connectionTypes.includes('target');
  const showSource = connectionTypes.includes('source');

  return (
    <Fragment>
      {connectionEnable && showTarget && (
        <div className="flow_handle_left">
          <Handle
            type="target"
            position={Position.Left}
            className="flow_handle"
            isConnectable={isConnectable}
          />
        </div>
      )}
      {connectionEnable && showSource && (
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
                    isConnectable={isConnectable}
                  />
                  <PlusOutlined />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </Fragment>
  );
}

export default Handler;