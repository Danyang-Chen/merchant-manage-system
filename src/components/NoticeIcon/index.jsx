import React from 'react';
import { Badge, Dropdown, Card } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styles from './style.less';
import NoticeList from './NoticeList';

const NoticeIcon = () => {
  const notificationBox = <NoticeList />;

  return (
    <Dropdown arrow placement="bottomRight" overlay={notificationBox}>
      <Badge
        count={1}
        style={{
          boxShadow: 'none',
        }}
        className={styles.badge}
      >
        <BellOutlined className={styles.icon} />
      </Badge>
    </Dropdown>
  );
};

export default NoticeIcon;
