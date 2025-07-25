import type { FC, ReactElement } from 'react';
import styles from './styles.module.less';

type AtomNodeProps = {
  icon: ReactElement;
  title: string;
  desc: string;
  role: string;
  onClick?: () => void;
}

const AtomNode: FC<AtomNodeProps> = (props) => {
  return (
    <div
      data-role={props.role}
      onClick={props.onClick}
      className={styles.atom_node}
    >
      <div className={styles.atom_icon}>
        {props.icon}
      </div>
      <div className={styles.atom_content}>
        <div className={styles.atom_title}>
          {props.title}
        </div>
        <div className={styles.atom_desc}>
          {props.desc}
        </div>
      </div>
    </div>
  );
}

export default AtomNode;