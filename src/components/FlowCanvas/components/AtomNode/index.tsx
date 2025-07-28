import type { FC } from 'react';
import styles from './styles.module.less';

type AtomNodeProps = {
  Icon: FC<any>;
  title: string;
  desc: string;
  onClick?: () => void;
}

const AtomNode: FC<AtomNodeProps> = (props) => {
  const { Icon, ...rest } = props;
  return (
    <div
      onClick={props.onClick}
      className={styles.atom_node}
    >
      <div className={styles.atom_icon}>
        <Icon />
      </div>
      <div className={styles.atom_content}>
        <div className={styles.atom_title}>
          {rest.title}
        </div>
        <div className={styles.atom_desc}>
          {rest.desc}
        </div>
      </div>
    </div>
  );
}

export default AtomNode;