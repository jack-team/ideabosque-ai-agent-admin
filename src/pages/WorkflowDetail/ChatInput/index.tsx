import { type FC } from 'react';
import { Input } from 'antd';
import ReactFlow, {
  Handle,
  Position
} from 'reactflow';
import styles from './styles.module.less';

const ChatInput: FC<any> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Ai Chat</div>
      {/* 多个源连接点 */}
      <Input readOnly placeholder="Please enter" size="small" />
      <Handle type="source" position={Position.Top} id="a" style={{ top: -6 }} />
      <Handle type="target" position={Position.Bottom} id="b" style={{ bottom: -6 }} />
    </div>
  );
}

export default ChatInput;