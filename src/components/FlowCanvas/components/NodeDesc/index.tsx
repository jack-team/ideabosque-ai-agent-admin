import type { FC } from 'react';
import styles from './styles.module.less';

type NodeDescProps = {
  title?: string;
  desc?: string;
}

const NodeDesc: FC<NodeDescProps> = (props) => {
  return (
    <div className={styles.node_desc}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.desc}</div>
    </div>
  );
}

export default NodeDesc;

