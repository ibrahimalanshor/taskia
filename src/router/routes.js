import { homeRoutes } from 'src/features/home/home.routes';
import { authRoutes } from 'src/features/auth/auth.routes';

export const routes = [...homeRoutes, ...authRoutes];
