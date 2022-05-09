import React from 'react';
import { Link } from 'umi';
import { Layout, Menu, Breadcrumb, ConfigProvider } from 'antd';
import {
  TeamOutlined,
  ClusterOutlined,
  UserOutlined,
  DeleteOutlined,
  DesktopOutlined,
  PicLeftOutlined,
  BankOutlined,
} from '@ant-design/icons';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from './style.css';
import Login from '@/components/Login';
import RightContent from '../components/RightContent';
import Icon from '../components/Icon';

const { Header, Content, Sider, Footer } = Layout;

// const getName = (str) => {
//   return str.substr(str.lastIndexOf('/') + 1);
// };

// /{name} => {name} substr(str, index, {lastIndex}) [index, lastIndex)
// /{name}/{title} => {name}-{title}

const formatPathName = (name) => {
  return name.substr(1);
};

const BasicLayout = (props) => {
  const { children, route, location } = props;
  const { routes } = route;
  const pathName = location.pathname;

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header className={styles.header}>
          <PicLeftOutlined className={styles.icon} />
          <Link to="/">
            <div className={styles.hdtitle}>商家管理信息系统</div>
          </Link>
          {/* <span className={styles.avataritem}></span> */}
          <RightContent />
          <Login />
        </Header>
        <Layout className={styles.mainbar}>
          <Sider className={styles.sider}>
            <Menu mode="inline" selectedKeys={[pathName]}>
              {routes.map((route) => {
                if (route.name && route.icon) {
                  return (
                    <Menu.Item
                      icon={<Icon type={route.icon} />}
                      key={route.path}
                    >
                      <Link to={route.path}>{route.name}</Link>
                    </Menu.Item>
                  );
                }
              })}
              {/* <Menu.Item key="merchant" icon={<TeamOutlined />}>
                <Link to="/merchant">商铺管理</Link>
              </Menu.Item>
              <Menu.Item key="manager" icon={<UserOutlined />}>
                <Link to="/manager">店员管理</Link>
              </Menu.Item>
              <Menu.Item key="house" icon={<BankOutlined />}>
                <Link to="/house">房屋管理</Link>
              </Menu.Item>
              <Menu.Item key="category" icon={<ClusterOutlined />}>
                <Link to="/category">品类管理</Link>
              </Menu.Item>
              <Menu.Item key="record" icon={<DeleteOutlined />}>
                <Link to="/record">回收站</Link>
              </Menu.Item> */}
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
