import { useAuthStore } from 'src/features/auth/auth.store';

export function authGuard(to) {
  const authStore = useAuthStore();

  if (to.matched.some((route) => route.meta.auth) && !authStore.loggedIn) {
    return {
      name: 'login',
    };
  }
}
