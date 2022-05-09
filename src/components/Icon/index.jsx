import React from 'react';
import {
  TeamOutlined,
  ClusterOutlined,
  UserOutlined,
  DeleteOutlined,
  BankOutlined,
} from '@ant-design/icons';

const mapping = {
  TeamOutlined: <TeamOutlined />,
  UserOutlined: <UserOutlined />,
  BankOutlined: <BankOutlined />,
  ClusterOutlined: <ClusterOutlined />,
  DeleteOutlined: <DeleteOutlined />,
};

const Icon = (props) => {
  const { type } = props;
  return mapping[type];
};

export default Icon;
