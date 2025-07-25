import type { FC } from 'react';
import { customAtoms } from '../../customAtoms';
import styles from './styles.module.less';

const Nodes: FC = () => {
  return (
    <div className={styles.nodes}>
      {customAtoms.map((CustomAtom, i) => {
        return (
          <div key={i} className={styles.node_item}>
            <CustomAtom />
          </div>
        );
      })}
    </div>
  );
}

export default Nodes;