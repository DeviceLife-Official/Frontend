import RootLayout from '@/layouts/RootLayout';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRoutes = {
  path: '/',
  element: <RootLayout />,
  children: [
    PublicRoutes,
    PrivateRoutes,
  ],
};
