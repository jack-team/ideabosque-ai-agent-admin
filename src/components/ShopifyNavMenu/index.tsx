import type { FC } from 'react';
import { NavMenu } from '@shopify/app-bridge-react';
import navs from './navs.json';

const ShopifyNavMenu: FC = () => {
  return (
    <div style={{ display: 'none' }}>
      <NavMenu>
        {navs.filter(v => !v.hide).map(nav => {
          return (
            <a
              key={nav.path}
              rel={nav.rel}
              href={nav.path}
            >
              {nav.title}
            </a>
          );
        })}
      </NavMenu>
    </div>
  );
}

export default ShopifyNavMenu;