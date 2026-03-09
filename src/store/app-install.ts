import qs from 'qs';
import { create } from 'zustand';
import type { AppInstalledResult } from '@/typings/app-install';
import { appId, shop, installBaseUrl, partId } from '@/env';
import { appInstallApi } from '@/services/auth';

type AppInstallModelTypes = {
  loading: boolean;
  appId?: string;
  shop?: string;
  quotas: AppInstalledResult['quotas'];
}

type AppInstallModelMethods = {
  appIntsall: () => Promise<void>;
}

const params: Record<string, any> = { shop, appId };

const openUrl = (url: string) => open(url, '_top');

// 跳转认证链接
const jumpAuth = () => {
  const search = qs.stringify(params);
  openUrl(`${installBaseUrl}/app_callback?${search}`);
}

const checkSubscription = (res: AppInstalledResult) => (
  new Promise((resolve) => {
    if (res.app_subscription.active) {
      resolve(null);
    } else {
      // 如果当前订阅无效跳转订阅链接
      openUrl(`https://admin.shopify.com/store/${partId}/charges/${partId}/pricing_plans`);
    }
  })
);

export const useAppInstallModel = create<AppInstallModelTypes & AppInstallModelMethods>(
  (set) => ({
    appId,
    shop,
    list: [],
    quotas: {},
    loading: !!shop,

    appIntsall: async () => {
      if (!shop) {
        return;
      }
      
      // 检查是否已经安装
      const res = await appInstallApi(params);

      // 安装过的直接显示 ui 界面
      if (res.authed) {
        set({ quotas: res.quotas });

        // 需要订阅，检查订阅信息
        if (res.subscription_required) {
          await checkSubscription(res);
        }

        set({ loading: false });
        return;
      }
      // 没有安装过的，跳转安装链接
      else {
        jumpAuth();
      }
    }
  })
);

export default useAppInstallModel;