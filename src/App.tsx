import type { FC } from 'react';
import { Suspense } from 'react';
import enUS from 'antd/es/locale/en_US';
import zhTW from 'antd/es/locale/zh_TW';
import zhCN from 'antd/es/locale/zh_CN';
import type { Locale } from 'antd/es/locale';
import { useTranslation } from "react-i18next";
import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import AppWrapper from '@/components/AppWrapper';
import ShopifyNavMenu from '@/components/ShopifyNavMenu';
import { cssVariables } from '@/variables/css-variables';
import StyledVariables from '@/components/StyledVariables';
import { themeConfigs } from './theme';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const locales: Record<string, Locale> = {
  'ZH-CN': zhCN,
  'ZH-TW': zhTW,
  'EN-US': enUS
}

const App: FC = () => {
  const { i18n } = useTranslation();
  const lng = i18n.language.toLocaleUpperCase();

  return (
    <ConfigProvider
      theme={themeConfigs}
      locale={locales[lng] || enUS}
    >
      <AntApp>
        <div className="app-wrapper">
          <ShopifyNavMenu />
          <AppWrapper>
            <StyledVariables variables={cssVariables} />
            <Suspense
              fallback={
                <Spinner
                  className="spinner"
                  type="infinity-spin"
                />
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </AppWrapper>
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
