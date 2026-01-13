import type { FC } from 'react';
import { NavMenu } from '@shopify/app-bridge-react';
import navs from './navs.json';

const ShopifyNavMenu: FC = () => {
  return (
    <span style={{ display: 'none' }}>
      <NavMenu>
        {navs.map(nav => {
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
    </span>
  );
}

export default ShopifyNavMenu;