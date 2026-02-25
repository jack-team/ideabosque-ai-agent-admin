import type { FC } from 'react';
import { Suspense, useMemo } from 'react';
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
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS
}

const App: FC = () => {
  const { i18n } = useTranslation();

  const locale = useMemo(() => {
    return locales[i18n.language] || enUS;
  }, [i18n.language]);

  return (
    <ConfigProvider
      locale={locale}
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
