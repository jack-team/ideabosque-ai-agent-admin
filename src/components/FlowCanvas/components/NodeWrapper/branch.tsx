import type { FC } from 'react';
import { Handle, Position } from "@xyflow/react";
import SelectNodeDrawer from "../SelectNodeDrawer";
import { DefaultSourceId } from '../../constants';
import type { BranchProps } from './types';
import styles from './styles.module.less';

const Branch: FC<BranchProps> = (props) => {
  const { branch = [] } = props;

  const renderItem = (id: string) => {
    return (
      <SelectNodeDrawer
        triggerId={id}
        onChange={props.onChange}
      >
        <Handle
          id={id}
          type="source"
          position={Position.Right}
          className={styles.handle_source}
        />
      </SelectNodeDrawer>
    );
  }

  if (!branch.length) {
    return renderItem(DefaultSourceId);
  }

  return (
    <div className={styles.branch}>
      {branch.map((item) => (
        <div key={item.value} className={styles.branch_item}>
          <div className={styles.branch_label}>{item.label}</div>
          {renderItem(item.value)}
        </div>
      ))}
    </div>
  );
}

export default Branch;