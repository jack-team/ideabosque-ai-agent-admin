import type { FC } from 'react';
import { useSearchParams } from 'react-router';
import { Outlet } from 'react-router-dom';
import ShopifyNavMenu from '@/components/ShopifyNavMenu';
import NavMenu from '@/components/NavMenu';
import './styles.less';

const BaseLayout: FC = () => {
  const [params] = useSearchParams();
  const inShopify = params.get('embedded') === '1';

  return (
    <div className="base_layout">
      {!inShopify ? <NavMenu /> : <ShopifyNavMenu />}
      <div className="base_layout_body">
        <Outlet />
      </div>
    </div>
  )
}

export default BaseLayout;