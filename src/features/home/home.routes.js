export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
      title: 'Home',
      layout: 'layout-app',
    },
    component: () => import('./pages/home-page.vue'),
  },
];
