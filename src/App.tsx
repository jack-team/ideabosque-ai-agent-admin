import type { FC } from 'react';
import { Suspense } from 'react';
import enUS from 'antd/es/locale/en_US';
import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppWrapper from '@/components/AppWrapper';
import Spinner from '@/components/Spinner';
import ShopifyNavMenu from '@/components/ShopifyNavMenu';
import { cssVariables } from '@/variables/css-variables';
import StyledVariables from '@/components/StyledVariables';
import { themeConfigs } from './theme';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const App: FC = () => {
  return (
    <ConfigProvider
      locale={enUS}
      theme={themeConfigs}
    >
      <AntApp>
        <div className="app-wrapper">
          <ShopifyNavMenu />
          <AppWrapper>
            <StyledVariables variables={cssVariables} />
            <Suspense fallback={<Spinner className="spinner" type="infinity-spin" />}>
              <RouterProvider router={router} />
            </Suspense>
          </AppWrapper>
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
