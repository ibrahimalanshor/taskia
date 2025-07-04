export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      guest: true,
    },
    component: () => import('./pages/login-page.vue'),
  },
];
