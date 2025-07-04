import { useAuthStore } from 'src/features/auth/auth.store';

export function guestGuard(to) {
  const authStore = useAuthStore();

  if (to.matched.some((route) => route.meta.guest) && authStore.loggedIn) {
    return {
      name: 'home',
    };
  }
}
