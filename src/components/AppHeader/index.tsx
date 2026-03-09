import { type FC } from 'react';
import { Dropdown } from 'antd';
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { useUserModel } from '@/store/user';
import styles from './styles.module.less';

const AppHeader: FC = () => {
  const user = useUserModel(s => s.user);
  const logout = useUserModel(s => s.logout);
  const collapsed = useUserModel(s => s.collapsed);
  const toggleCollapsed = useUserModel(s => s.toggleCollapsed);

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => logout(),
      label: <span className={styles.logout_text}>Logout</span>
    }
  ];

  return (
    <div className={styles.container}>
      <div
        onClick={toggleCollapsed}
        className={styles.menu_switch}
      >
        {!collapsed ?
          <MenuFoldOutlined /> :
          <MenuUnfoldOutlined />
        }
      </div>
      <Dropdown
        menu={{ items: menuItems }}
        openClassName={styles.menu_open}
      >
        <div className={styles.user}>
          <div className={styles.user_name}>
            {user?.userName}
          </div>
          <div className={styles.arrow}>
            <DownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default AppHeader;