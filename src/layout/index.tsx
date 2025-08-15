import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import ShopifyNavMenu from '@/components/ShopifyNavMenu';
import Auth from '@/components/Auth';
import './styles.less';

const BaseLayout: FC = () => {
  return (
    <div className="base_layout">
      <ShopifyNavMenu />
      <Auth>
        <div className="base_layout_body">
          <Outlet />
        </div>
      </Auth>
    </div>
  );
}

export default BaseLayout;