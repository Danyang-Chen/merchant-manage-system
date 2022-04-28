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
        { path: '/test', component: '@/pages/index' },
        { path: '/merchant', component: '@/pages/merchant' },
        { path: '/category', component: '@/pages/category' },
        { path: '/manager', component: '@/pages/manager' },
        { path: '/record', component: '@/pages/record' },
      ],
    },
  ],
  fastRefresh: {},
});
