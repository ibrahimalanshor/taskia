export const backlogRoutes = [
  {
    path: '/backlog',
    name: 'backlog',
    meta: {
      auth: true,
      title: 'Upcoming Tasks',
      layout: 'layout-app',
    },
    component: () => import('./pages/backlog-page.vue'),
  },
];
