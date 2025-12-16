import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { lazyLoad } from "@/utils/lazyload";
import BaseLayout from "./layout";


export const routes: RouteObject[] = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/agents" />,
      },
      // {
      //   path: "/dashboard",
      //   Component: lazyLoad(() => import("@/pages/dashboardEntry")),
      // },
      {
        path: "/customer-groups",
        Component: lazyLoad(() => import("@/pages/customerGroupsEntry")),
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
        Component: lazyLoad(() => import("@/pages/agentWorkflowsEntry")),
      },
      {
        path: "/agent-workflows/detail/:uid/:vid",
        Component: lazyLoad(() => import("@/pages/workflowDetailEntry")),
      },
      // {
      //   path: "/settings",
      //   Component: lazyLoad(() => import("@/pages/settingsEntry")),
      // },
      // agents
      {
        path: '/agents',
        Component: lazyLoad(() => import("@/pages/agentsEntry"))
      },
      {
        path: '/coordinations',
        Component: lazyLoad(() => import("@/pages/coordinations"))
      },
      // {
      //   path: '/contact-profiles',
      //   Component: lazyLoad(() => import("@/pages/contactProfileEntry"))
      // },
      {
        path: '/places',
        Component: lazyLoad(() => import("@/pages/places"))
      },
      // wizard
      {
        path: '/wizard-groups',
        Component: lazyLoad(() => import("@/pages/wizardGroups"))
      },
      {
        path: '/wizard-group/:uid',
        Component: lazyLoad(() => import("@/pages/wizardGroupDetail"))
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
      },
      {
        path: '/theme',
        Component: lazyLoad(() => import("@/pages/Theme"))
      },
      {
        path: '/demo',
        Component: lazyLoad(() => import("@/pages/demo"))
      },
      // MCP Console
      {
        path: '/mcp-console',
        element: <Navigate replace to="/mcp-console/modules" />,
      },
      {
        path: '/mcp-console/modules',
        Component: lazyLoad(() => import("@/pages/mcpConsole/modules"))
      },
      {
        path: '/mcp-console/functions',
        Component: lazyLoad(() => import("@/pages/mcpConsole/functions"))
      },
      {
        path: '/mcp-console/function-calls',
        Component: lazyLoad(() => import("@/pages/mcpConsole/functionCalls"))
      }
    ],
  },
];
