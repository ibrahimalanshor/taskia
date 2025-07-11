export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      guest: true,
      title: 'Login',
    },
    component: () => import('./pages/login-page.vue'),
  },
];
