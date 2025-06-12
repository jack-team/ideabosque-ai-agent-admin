import type { FC } from 'react';
import { NavMenu } from '@shopify/app-bridge-react';
import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { themeConfigs } from './theme/config';
import { routes } from './routes';
import './app.less';

const router = createBrowserRouter(routes);

const App: FC = () => {
  return (
    <ConfigProvider
      theme={themeConfigs}
      locale={{ locale: "en" }}
    >
      <AntApp>
        <div className="app-container">
          <NavMenu>
            <a href="/" rel="home">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/customer-groups">Customer Groups</a>
            <a href="/agent-workflows">Agent Workflows</a>
            <a href="/settings">Settings</a>
          </NavMenu>
          <RouterProvider router={router} />
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
