import { lazy } from 'react';
import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import RouteError from './components/RouteError';
import { NoAuthWrapper, AuthWrapper } from '@/components/AuthWrapper';
import { shop } from '@/env';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('./pages/agent'))
  },
  {
    path: '/agent',
    Component: lazy(() => import('./pages/agent'))
  },
  {
    path: '/agent/review/:coordinationUuid',
    Component: lazy(() => import('./pages/agent/reviewAgent'))
  },
  {
    path: '/workflow',
    Component: lazy(() => import('./pages/workflow/list'))
  },
  {
    path: '/workflow/detail',
    Component: lazy(() => import('./pages/workflow/detail'))
  },
  {
    path: '/workflow/template',
    Component: lazy(() => import('./pages/workflow/template'))
  },
  {
    path: '/workflow/template/detail',
    Component: lazy(() => import('./pages/workflow/template/editForm'))
  },
  {
    path: '/workflow/template/mcp-server',
    Component: lazy(() => import('./pages/mcpServer/list'))
  },
  {
    path: '/workflow/template/ui-component',
    Component: lazy(() => import('./pages/uiComponent/list'))
  },
  {
    path: '/ui-block-group',
    Component: lazy(() => import('./pages/uiBlockGroup/list'))
  },
  {
    path: '/ui-block-group/:wizardGroupUuid',
    Component: lazy(() => import('./pages/uiBlockGroup/detail'))
  },
  {
    path: '/thread',
    Component: lazy(() => import('./pages/thread/list'))
  },
  {
    path: '/thread/detail/:threadUuid',
    Component: lazy(() => import('./pages/thread/detail'))
  },
  {
    path: '/thread/async-tasks',
    Component: lazy(() => import('./pages/asyncTasks'))
  },
  {
    path: '/theme',
    Component: lazy(() => import('./pages/themeSetting/list'))
  },
  {
    path: '/theme/detail/:themeUuid',
    Component: lazy(() => import('./pages/themeSetting/detail'))
  },
  {
    path: '/mcp-console',
    Component: lazy(() => import('./pages/mcpConsole'))
  },
  {
    path: '/mcp-console/function/:name',
    Component: lazy(() => import('./pages/mcpConsole/functions/detail'))
  },
  {
    path: '/clients',
    Component: lazy(() => import('./pages/clients/list'))
  },
  {
    path: '/clients/:clientd',
    Component: lazy(() => import('./pages/clients/detail'))
  }
];

const authRoutes: RouteObject[] = [
  {
    path: '/signin',
    Component: lazy(() => import('./pages/signin'))
  },
  {
    path: '/signup',
    Component: lazy(() => import('./pages/signup'))
  },
  {
    path: '/verify-code',
    Component: lazy(() => import('./pages/verifyCode'))
  }
];

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <RouteError />,
    children: [
      // main routes
      {
        path: '/',
        // 如果不存在店铺 id
        Component: !shop ? NoAuthWrapper : null,
        children: [
          {
            path: '/',
            Component: AppLayout,
            children: mainRoutes
          }
        ]
      },
      // auth routes
      {
        path: '/',
        // 如果不存在店铺 id
        Component: !shop ? AuthWrapper : null,
        children: !shop ? authRoutes : []
      }
    ]
  },
  {
    path: '/404',
    Component: lazy(() => import('./pages/notFound'))
  },
  {
    path: '*',
    element: <Navigate replace to="/404" />
  }
];
