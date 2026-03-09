import { Menu } from 'antd';
import classNames from 'classnames';
import { type FC, useMemo } from 'react';
import * as icons from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import { pathToRegexp } from 'path-to-regexp';
import { useLocation } from 'react-router-dom';
import { useUserModel } from '@/store/user';
import { useNavigate } from '@/hooks/useNavigate';
import navs from '../ShopifyNavMenu/navs.json';
import styles from './styles.module.less';

const renderNavs = navs.filter(nav => !nav.rel);

const AppMenu: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collapsed = useUserModel(s => s.collapsed);

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
        theme="dark"
        mode="inline"
        className={classNames(
          styles.menus,
          collapsed && styles.collapsed
        )}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        items={renderNavs.map(nav => {
          const Icon = icons[nav.icon as never] as FC;
          return {
            key: nav.path,
            icon: <Icon />,
            label: t(nav.title),
            onClick: () => navigate(nav.path)
          }
        })}
      />
    </div>
  );
}

export default AppMenu;