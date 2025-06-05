import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazyLoad } from '@/utils/lazyload';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate replace to="/dashboard" />
  },
  {
    path: '/dashboard',
    element: lazyLoad(() => import('@/pages/Dashboard'))
  }
];