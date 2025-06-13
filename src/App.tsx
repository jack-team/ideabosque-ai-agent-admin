import type { FC } from 'react';
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
          <RouterProvider router={router} />
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
