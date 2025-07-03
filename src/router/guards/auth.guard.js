export function authGuard(to) {
  const loggedIn = false;

  if (to.matched.some((route) => route.meta.auth) && !loggedIn) {
    return {
      name: 'login',
    };
  }
}
