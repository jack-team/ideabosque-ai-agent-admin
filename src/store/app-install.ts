import qs from 'qs';
import { create } from 'zustand';
import { appId, shop, appInstallUrl } from '@/env';
import { appInstallApi } from '@/services/auth';

type AppInstallModelTypes = {
  loading: boolean;
  appId?: string;
  shop?: string;
}

type AppInstallModelMethods = {
  appIntsall: () => Promise<void>;
}

const jumpAuth = () => {
  const search = qs.stringify({ shop, appId });
  const url = `${appInstallUrl}/app_callback?${search}`;
  open(url, '_top');
}

export const useAppInstallModel = create<AppInstallModelTypes & AppInstallModelMethods>(
  (set) => ({
    appId,
    shop,
    list: [],
    loading: !!shop,

    appIntsall: async () => {
      if (!shop) {
        return;
      }

      // 检查是否已经安装
      const res = await appInstallApi({ appId, shop });

      // 安装过的直接显示 ui 界面
      if (res.authed) {
        set({ loading: false });
      } else {
        // 没有安装过的，跳转安装链接
        jumpAuth();
      }
    }
  })
);

export default useAppInstallModel;