import { type FC } from 'react';
import { Handle, Position } from "@xyflow/react";
import SelectNodeDrawer from "../SelectNodeDrawer";
import type { BranchGroupProps } from './types';
import styles from './styles.module.less';

const BranchGroup: FC<BranchGroupProps> = (props) => {
  const { id, onChange } = props;

  return (
    <SelectNodeDrawer
      triggerId={id}
      onChange={onChange}
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

export default BranchGroup;