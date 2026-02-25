import type { FC } from 'react';
import { useLang } from '@/hooks/useLang';
import styles from './styles.module.less';

type AtomNodeProps = {
  Icon: FC<any>;
  title: string;
  desc: string;
  onClick?: () => void;
}

const AtomNode: FC<AtomNodeProps> = (props) => {
  const { Icon, ...rest } = props;
  const { t } = useLang();
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
          {t(rest.title)}
        </div>
        <div className={styles.atom_desc}>
          {t(rest.desc)}
        </div>
      </div>
    </div>
  );
}

export default AtomNode;