import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import { NavMenu } from '@shopify/app-bridge-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { themeConfigs } from './theme/config';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const App: FC = () => {
  return (
    <div className="app-container">
      <ConfigProvider
        theme={themeConfigs}
        locale={{ locale: "en" }}
      >
        <NavMenu>
          <a href="/" rel="home">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/customer-groups">Customer Groups</a>
          <a href="/agent-workflows">Agent Workflows</a>
          <a href="/settings">Settings</a>
        </NavMenu>
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
