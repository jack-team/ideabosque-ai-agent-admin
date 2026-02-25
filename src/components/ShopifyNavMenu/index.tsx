import type { FC } from 'react';
import { useLang } from '@/hooks/useLang';
import { NavMenu } from '@shopify/app-bridge-react';
import navs from './navs.json';

const ShopifyNavMenu: FC = () => {
  const { t } = useLang();
  
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
              {t(nav.title)}
            </a>
          );
        })}
      </NavMenu>
    </span>
  );
}

export default ShopifyNavMenu;