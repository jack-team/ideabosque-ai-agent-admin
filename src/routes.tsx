import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { lazyLoad } from "@/utils/lazyload";
import BaseLayout from "./layout";

import '@/services/wizard'

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        Component: lazyLoad(() => import("@/pages/dashboard")),
      },
      // auth start
      {
        path: '/auth-start',
        Component: () => null,
      },
      {
        path: '/auth-success',
        Component: () => null,
      },
      {
        path: "/customer-groups",
        Component: lazyLoad(() => import("@/pages/customerGroups")),
      },
      // workflow-templates
      {
        path: "/workflow-templates",
        Component: lazyLoad(() => import("@/pages/workflowTemplates")),
      },
      {
        path: "/workflow-templates/detail/:uid/:vid",
        Component: lazyLoad(() => import("@/pages/workflowTemplateDetail")),
      },
      {
        path: "/workflow-ui-components",
        Component: lazyLoad(() => import("@/pages/uiComponents")),
      },
      {
        path: "/workflow-mcp-servers",
        Component: lazyLoad(() => import("@/pages/mcpServers")),
      },
      // agent-workflows
      {
        path: "/agent-workflows",
        Component: lazyLoad(() => import("@/pages/agentWorkflows")),
      },
      {
        path: "/agent-workflows/detail/:uid/:vid",
        Component: lazyLoad(() => import("@/pages/workflowDetail")),
      },
      {
        path: "/settings",
        Component: lazyLoad(() => import("@/pages/settings")),
      },
      // agents
      {
        path: '/agents',
        Component: lazyLoad(() => import("@/pages/agentsEntry"))
      },
      {
        path: '/coordinations',
        Component: lazyLoad(() => import("@/pages/coordinations"))
      },
      {
        path: '/contact-profiles',
        Component: lazyLoad(() => import("@/pages/contactProfiles"))
      },
      {
        path: '/places',
        Component: lazyLoad(() => import("@/pages/places"))
      },
      {
        path: '/contact-requests',
        Component: lazyLoad(() => import("@/pages/contactRequests"))
      },
      // wizard
      {
        path: '/wizard-groups',
        Component: lazyLoad(() => import("@/pages/wizardGroups"))
      },
      {
        path: '/wizards',
        Component: lazyLoad(() => import("@/pages/wizards"))
      },
      {
        path: '/elements',
        Component: lazyLoad(() => import("@/pages/elements"))
      },
      {
        path: '/question-groups',
        Component: lazyLoad(() => import("@/pages/questionGroups"))
      },
      {
        path: '/messages',
        Component: lazyLoad(() => import("@/pages/messages"))
      },
      {
        path: '/threads',
        Component: lazyLoad(() => import("@/pages/threads"))
      },
      {
        path: '/async-tasks',
        Component: lazyLoad(() => import("@/pages/asyncTasks"))
      }
    ],
  },
];
