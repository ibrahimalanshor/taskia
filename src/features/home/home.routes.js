export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
      title: 'Home',
    },
    component: () => import('./pages/home-page.vue'),
  },
];
