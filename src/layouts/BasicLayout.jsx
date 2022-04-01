import React, { Fragment, useState } from 'react';
import Login from '@/components/Login';
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Badge,
  ConfigProvider,
  Popover,
  Button,
  Modal,
  Input,
  Form,
} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  TeamOutlined,
  ClusterOutlined,
  UserOutlined,
  DeleteOutlined,
  DesktopOutlined,
  BellOutlined,
} from '@ant-design/icons';
import styles from './style.css';
import { Link } from 'umi';

const { Header, Content, Sider, Footer } = Layout;

const BasicLayout = ({ children }) => {
  //   const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header className={styles.header}>
          <Fragment>
            <DesktopOutlined className={styles.icon} />
            <div className={styles.hdtitle}>青理商家管理信息系统</div>

            <span className={styles.avataritem}>
              <Popover
                placement="bottomRight"
                content={
                  <>
                    <p>个人设置</p>
                    <Button
                      type="link"
                      onClick={() => {
                        localStorage.removeItem('currentUser');
                      }}
                    >
                      退出登录
                    </Button>
                  </>
                }
                trigger="hover"
              >
                <Badge count={1}>
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    className={styles.user}
                    size="large"
                  />{' '}
                </Badge>
              </Popover>
            </span>
            <Login />
          </Fragment>
        </Header>
        <Layout className={styles.mainbar}>
          <Sider
            //   theme="light"
            //   collapsed={collapsed}
            //   collapsible
            //   onCollapse={setCollapsed}
            className={styles.sider}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              <Menu.Item icon={<TeamOutlined />}>
                <Link to="/merchant">商家管理</Link>
              </Menu.Item>
              <Menu.Item icon={<ClusterOutlined />}>
                <Link to="/category">品类管理</Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />}>
                <Link to="/manager">负责人管理</Link>
              </Menu.Item>
              <Menu.Item icon={<DeleteOutlined />}>回收站</Menu.Item>
            </Menu>
          </Sider>
          <Layout className={styles.allcontent}>
            <Breadcrumb className={styles.breadcrumb}></Breadcrumb>
            <Content className={styles.content}>
              <div>{children}</div>
            </Content>
            <Footer className={styles.footer}>
              <div className={styles.fttitle}>2022</div>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
