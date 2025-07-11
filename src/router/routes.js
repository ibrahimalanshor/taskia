import { focusRoutes } from 'src/features/focus/focus.routes';
import { authRoutes } from 'src/features/auth/auth.routes';

export const routes = [...focusRoutes, ...authRoutes];
