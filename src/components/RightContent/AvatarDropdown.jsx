import React from 'react';
import { history } from 'umi';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './style.less';

const loginOut = () => {
  localStorage.removeItem('currentUser');
  history.go(0);
};

const AvatarDropdown = () => {
  const menuHeaderDropdown = (
    <Menu className={styles.menu}>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={loginOut}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      arrow
      overlay={menuHeaderDropdown}
      placement="bottomRight"
      trigger={['hover']}
    >
      <Avatar
        src="https://joeschmoe.io/api/v1/random"
        className={styles.avatar}
        size="large"
      />
    </Dropdown>
  );
};

export default AvatarDropdown;
