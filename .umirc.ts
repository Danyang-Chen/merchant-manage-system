import { defineConfig } from 'umi';
import {
  TeamOutlined,
  ClusterOutlined,
  UserOutlined,
  DeleteOutlined,
  DesktopOutlined,
  PicLeftOutlined,
  BankOutlined,
} from '@ant-design/icons';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/', component: '@/pages/introduce' },
        {
          icon: 'BankOutlined',
          name: '商铺管理',
          path: '/merchant',
          component: '@/pages/merchant',
        },
        {
          icon: 'UserOutlined',
          name: '店员管理',
          path: '/manager',
          component: '@/pages/manager',
        },
        {
          icon: 'ClusterOutlined',
          name: '品类管理',
          path: '/category',
          component: '@/pages/category',
        },
        {
          icon: 'DeleteOutlined',
          name: '回收站',
          path: '/record',
          component: '@/pages/record',
        },
      ],
    },
  ],
  fastRefresh: {},
});
