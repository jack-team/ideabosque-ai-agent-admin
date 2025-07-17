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
        Component: lazyLoad(() => import('@/pages/dashboard'))
      },
      {
        path: '/customer-groups',
        Component: lazyLoad(() => import('@/pages/customerGroups'))
      },
      {
        path: '/agent-workflows',
        Component: lazyLoad(() => import('@/pages/agentWorkflows'))
      },
      {
        path: '/agent-workflows/detail/:uid/:vid',
        Component: lazyLoad(() => import('@/pages/workflowDetail'))
      },
      {
        path: '/ai-core-engine',
        Component: lazyLoad(() => import('@/pages/aiCoreEngine'))
      },
      {
        path: '/ai-core-engine/llm',
        Component: lazyLoad(() => import('@/pages/aiCoreEngine/llm'))
      },
      {
        path: '/ai-core-engine/agent',
        Component: lazyLoad(() => import('@/pages/aiCoreEngine/agent'))
      },
      {
        path: '/settings',
        Component: lazyLoad(() => import('@/pages/settings'))
      }
    ]
  }
];