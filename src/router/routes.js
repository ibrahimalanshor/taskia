import { focusRoutes } from 'src/features/focus/focus.routes';
import { authRoutes } from 'src/features/auth/auth.routes';
import { backlogRoutes } from '../features/backlog/backlog.routes';

export const routes = [...focusRoutes, ...backlogRoutes, ...authRoutes];
