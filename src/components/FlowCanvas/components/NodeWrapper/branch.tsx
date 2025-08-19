import type { FC } from 'react';
import { DefaultSourceId } from '../../constants';
import BranchGroup from './branchGroup';
import type { BranchProps } from './types';
import styles from './styles.module.less';

const Branch: FC<BranchProps> = (props) => {
  const { branch = [], onChange } = props;

  if (!branch.length) {
    return (
      <BranchGroup
        id={DefaultSourceId}
        onChange={onChange}
      />
    );
  }

  return (
    <div className={styles.branch}>
      {branch.map((item) => (
        <div key={item.id} className={styles.branch_item}>
          <div className={styles.branch_label}>{item.label}</div>
          <BranchGroup id={item.id} onChange={onChange} />
        </div>
      ))}
    </div>
  );
}

export default Branch;