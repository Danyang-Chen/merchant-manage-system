import React from 'react';
import { Link } from 'umi';
import { Layout, Menu, Breadcrumb, ConfigProvider } from 'antd';
import {
  TeamOutlined,
  ClusterOutlined,
  UserOutlined,
  DeleteOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import zhCN from 'antd/lib/locale/zh_CN';
import Login from '@/components/Login';
import styles from './style.css';
import RightContent from '../components/RightContent';

const { Header, Content, Sider, Footer } = Layout;

// const getName = (str) => {
//   return str.substr(str.lastIndexOf('/') + 1);
// };

const BasicLayout = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header className={styles.header}>
          <DesktopOutlined className={styles.icon} />
          <div className={styles.hdtitle}>青理商家管理信息系统</div>

          {/* <span className={styles.avataritem}></span> */}
          <RightContent />
          <Login />
        </Header>
        <Layout className={styles.mainbar}>
          <Sider className={styles.sider}>
            <Menu mode="inline">
              <Menu.Item icon={<TeamOutlined />}>
                {/* <Link to="/merchant">{getName(route.path)}商家管理</Link> */}
                <Link to="/merchant">商家管理</Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />}>
                <Link to="/manager">店员管理</Link>
              </Menu.Item>
              <Menu.Item icon={<ClusterOutlined />}>
                <Link to="/category">品类管理</Link>
              </Menu.Item>
              <Menu.Item icon={<DeleteOutlined />}>
                <Link to="/record">回收站</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className={styles.contentbar}>
            <Breadcrumb className={styles.breadcrumb}></Breadcrumb>
            <Content className={styles.content}>
              <div>{children}</div>
            </Content>
            <Footer className={styles.footer}>
              <div className={styles.footerContent}>2022</div>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
