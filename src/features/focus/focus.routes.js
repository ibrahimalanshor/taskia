export const focusRoutes = [
  {
    path: '/',
    name: 'focus',
    meta: {
      auth: true,
      title: 'Tasks to Focus On',
      layout: 'layout-app',
    },
    component: () => import('./pages/focus-page.vue'),
  },
];
