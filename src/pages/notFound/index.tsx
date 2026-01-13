import type { FC } from 'react';
import styles from './styles.module.less';

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.status}>404</div>
        <div className={styles.divider} />
        <div className={styles.message}>This page could not be found.</div>
      </div>
    </div>
  );
}

export default NotFound;