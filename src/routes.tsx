import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router';
import AppLayout from '@/components/AppLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: AppLayout,
    children: [
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
        path: '/theme-editor',
        Component: lazy(() => import('./pages/themeEditor'))
      },
      {
        path: '/404',
        Component: lazy(() => import('./pages/notFound'))
      },
      {
        path: '*',
        element: <Navigate replace to="/404" />
      }
    ]
  }
];
