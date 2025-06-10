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
  },
  {
    path: '/customer-groups',
    element: lazyLoad(() => import('@/pages/CustomerGroups'))
  },
  {
    path: '/agent-workflows',
    element: lazyLoad(() => import('@/pages/AgentWorkflows'))
  },
  {
    path: '/agent-workflows/detail/:id',
    element: lazyLoad(() => import('@/pages/WorkflowDetail'))
  },
  {
    path: '/settings',
    element: lazyLoad(() => import('@/pages/Settings'))
  }
];