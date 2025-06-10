import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './styles.module.less';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export default memo(({ data, isConnectable }) => {
  return (
    <div className={styles.node}>
      <div>Node</div>
      <Handle
        type="source"
        position={Position.Left}
        id="blue"
        style={{ ...DEFAULT_HANDLE_STYLE, left: 2, background: 'blue' }}
        isConnectable={isConnectable}
      >

      </Handle>
      <Handle
        type="target"
        position={Position.Right}
        id="orange"
        style={{ ...DEFAULT_HANDLE_STYLE, background: 'orange' }}
        isConnectable={isConnectable}
      >

      </Handle>
    </div>
  );
});
