import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import ShopifyNavMenu from '@/components/ShopifyNavMenu';
import NavMenu from '@/components/NavMenu';
import Auth from '@/components/Auth';
import { getUrlParams } from '@/utils'
import './styles.less';

const inShopify = getUrlParams('embedded') === '1';

const BaseLayout: FC = () => {
  return (
    <div className="base_layout">
      <ShopifyNavMenu />
      {!inShopify && <NavMenu />}
      <Auth>
        <div className="base_layout_body">
          <Outlet />
        </div>
      </Auth>
    </div>
  );
}

export default BaseLayout;