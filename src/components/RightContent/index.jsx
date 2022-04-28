import React from 'react';
import { Space } from 'antd';
import AvatarDropdown from './AvatarDropdown';
import NoticeIcon from '../NoticeIcon';

const RightContent = () => {
  return (
    <Space size="large" style={{ float: 'right' }}>
      <NoticeIcon />
      <AvatarDropdown />
    </Space>
  );
};

export default RightContent;
