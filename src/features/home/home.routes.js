export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
    },
    component: () => import('./pages/home-page.vue'),
  },
];
