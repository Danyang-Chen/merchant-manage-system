import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/merchant', component: '@/pages/merchant' },
        { path: '/category', component: '@/pages/category' },
        { path: '/manager', component: '@/pages/manager' },
      ],
    },
  ],
  fastRefresh: {},
});
