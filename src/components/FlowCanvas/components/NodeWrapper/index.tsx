import type { FC, ReactElement } from 'react';
import { Handle, Position } from '@xyflow/react';
import SelectNodeDrawer from '../SelectNodeDrawer';
import styles from './styles.module.less';

type NodeBranchType = {
  id: string;
  label: string;
}

type NodeWrapperProps = {
  // 是否显示来源句柄
  source?: boolean;
  // 是否显示目标句柄
  target?: boolean;
  // 分支
  branch?: NodeBranchType[];
  children?: ReactElement | ReactElement[];
}

const NodeWrapper: FC<NodeWrapperProps> = (props) => {
  const {
    branch = [],
    source = true,
    target = true
  } = props;

  const renderSource = () => {
    if (!branch.length) {
      return (
        <SelectNodeDrawer>
          <Handle
            type="source"
            id="left_handle"
            position={Position.Right}
            className={styles.handle_source}
          />
        </SelectNodeDrawer>
      )
    }

    return (
      <div className={styles.branch}>
        {branch.map(item => {
          return (
            <div
              key={item.id}
              className={styles.branch_item}
            >
              <div className={styles.branch_label}>
                {item.label}
              </div>
              <Handle
                type="source"
                id={item.id}
                position={Position.Right}
                className={styles.handle_source}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {target && (
        <Handle
          type="target"
          id="right_handle"
          isConnectableStart={false}
          position={Position.Left}
          className={styles.handle}
        />
      )}
      <div className={styles.content}>
        {props.children}
      </div>
      {source && renderSource()}
    </div>
  );
}

export default NodeWrapper;