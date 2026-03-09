import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppMenu from '../AppMenu';
import AppHeader from '../AppHeader';
import { inShopify, shop } from '@/env';
import styles from './styles.module.less';

const AppLayout: FC = () => {
  return (
    <div className={styles.container}>
      {!inShopify && <AppMenu />}
      <div className={styles.inner}>
        {!shop && <AppHeader />}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;