import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazyLoad } from '@/utils/lazyload';
import BaseLayout from './layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        path: '/',
        element: <Navigate replace to="/dashboard" />
      },
      {
        path: '/dashboard',
        Component: lazyLoad(() => import('@/pages/Dashboard'))
      },
      {
        path: '/customer-groups',
        Component: lazyLoad(() => import('@/pages/CustomerGroups'))
      },
      {
        path: '/agent-workflows',
        Component: lazyLoad(() => import('@/pages/AgentWorkflows'))
      },
      {
        path: '/agent-workflows/detail/:uid/:vid',
        Component: lazyLoad(() => import('@/pages/WorkflowDetail'))
      },
      {
        path: '/settings',
        Component: lazyLoad(() => import('@/pages/Settings'))
      }
    ]
  }
];