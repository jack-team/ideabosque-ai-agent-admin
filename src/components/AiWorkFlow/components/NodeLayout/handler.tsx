import type { FC } from 'react';
import { Fragment } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusOutlined } from '@ant-design/icons';
import type { DataType } from './types';

const Handler: FC<DataType> = (props) => {
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
      <div className="flow_handle_right">
        <Handle
          type="source"
          position={Position.Right}
          className="flow_handle"
          isConnectable={props.isConnectable}
        />
        <PlusOutlined />
      </div>
    </Fragment>
  );
}

export default Handler;