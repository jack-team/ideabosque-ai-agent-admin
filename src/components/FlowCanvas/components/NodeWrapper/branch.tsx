import type { FC } from 'react';
import { useLang } from '@/hooks/useLang';
import { DefaultSourceId } from '../../constants';
import BranchGroup from './branchGroup';
import type { BranchProps } from './types';
import styles from './styles.module.less';

const Branch: FC<BranchProps> = (props) => {
  let { branch = [], onChange } = props;
  const { t } = useLang();

  if (!branch.length) {
    branch = [{
      id: DefaultSourceId,
      value: DefaultSourceId,
      label: t('flowCanvas.nextBrach')
    }];
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