export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/login-page.vue'),
  },
];
