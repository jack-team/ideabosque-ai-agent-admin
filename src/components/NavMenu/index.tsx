import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import navs from '../ShopifyNavMenu/navs.json';
import styles from './styles.module.less';

const NavMenu: FC = () => {
  return (
    <div className={styles.menus}>
      {navs.filter(e => !e.rel && !e.hide).map(nav => {
        return (
          <NavLink
            key={nav.path}
            to={nav.path}
            className={e=> {
              if (e.isActive) {
                return styles.nav_active
              }
            }}
          >
            {nav.title}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavMenu;