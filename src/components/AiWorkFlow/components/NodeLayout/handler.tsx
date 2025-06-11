import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { NodeProps } from './types';
import { ConnectionTypes } from '../../const';

const Handler: FC<NodeProps> = (props) => {
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
            isConnectable={props.isConnectable}
          />
        </div>
      )}
      {connectionEnable && showSource && (
        <div className="flow_handle_right">
          <Handle
            type="source"
            position={Position.Right}
            className="flow_handle"
            isConnectable={props.isConnectable}
          />
          <PlusOutlined />
        </div>
      )}
    </Fragment>
  );
}

export default Handler;