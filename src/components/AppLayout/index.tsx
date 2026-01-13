import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppMenu from '../AppMenu';
import ShopifyNavMenu from '../ShopifyNavMenu';
import { inShopify } from '@/env';
import styles from './styles.module.less';

const AppLayout: FC = () => {
  return (
    <div className={styles.container}>
      {inShopify ? <ShopifyNavMenu /> : <AppMenu />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;