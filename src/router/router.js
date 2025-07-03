import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { authGuard } from './guards/auth.guard';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(authGuard);

export { router };
