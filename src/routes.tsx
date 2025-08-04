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
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        Component: lazyLoad(() => import("@/pages/dashboard")),
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
      // ai-core-engine
      {
        path: "/ai-core-engine",
        Component: lazyLoad(() => import("@/pages/aiCoreEngine")),
      },
      {
        path: "/ai-core-engine/llm",
        Component: lazyLoad(() => import("@/pages/aiCoreEngine/llm")),
      },
      {
        path: "/ai-core-engine/agent",
        Component: lazyLoad(() => import("@/pages/aiCoreEngine/agent")),
      },
      {
        path: "/settings",
        Component: lazyLoad(() => import("@/pages/settings")),
      },
      // agents
      {
        path: '/agents',
        Component: lazyLoad(() => import("@/pages/agents"))
      },
      {
        path: '/coordinations',
        Component: lazyLoad(() => import("@/pages/coordinations"))
      },
      {
        path: 'contact-profiles',
        Component: lazyLoad(() => import("@/pages/contactProfiles"))
      },
       {
        path: 'places',
        Component: lazyLoad(() => import("@/pages/places"))
      }
    ],
  },
];
