import type { FC } from 'react';
import { Link } from 'react-router-dom';
import navs from '../ShopifyNavMenu/navs.json';
import styles from './styles.module.less';

const NavMenu: FC = () => {
  return (
    <div className={styles.menus}>
       {navs.map(nav => {
          return (
            <Link
              key={nav.path}
              to={nav.path}
            >
              {nav.title}
            </Link>
          );
        })}
    </div>
  );
}

export default NavMenu;