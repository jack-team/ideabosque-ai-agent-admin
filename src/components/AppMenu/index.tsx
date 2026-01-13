import { type FC, useMemo } from 'react';
import { Menu } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { useNavigate, useLocation } from 'react-router-dom';
import navs from '../ShopifyNavMenu/navs.json';
import styles from './styles.module.less';

const renderNavs = navs.filter(nav => !nav.rel);

const AppMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedKeys = useMemo(() => {
    const keys: string[] = [];
    for (const nav of renderNavs) {
      const { regexp } = pathToRegexp(nav.path, { end: false });
      if (regexp.test(pathname)) keys.push(nav.path);
    }
    return keys;
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Menu
        className={styles.menus}
        selectedKeys={selectedKeys}
        items={renderNavs.map(nav => {
          return {
            key: nav.path,
            label: nav.title,
            onClick: () => {
              navigate(nav.path);
            }
          }
        })}
      />
    </div>
  );
}

export default AppMenu;