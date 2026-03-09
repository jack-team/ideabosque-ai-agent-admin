import { getUrlParams } from '@/utils';
import { useUserModel } from '@/store/user';

export const apiKey = import.meta.env.ENV_API_KEY;
export const apiBaseUrl = import.meta.env.ENV_API_BASE_URL;
export const endpointId = import.meta.env.ENV_API_ENDPOINT_ID;

// url params
export const shop = getUrlParams('shop');

// partId 
export const partId = () => {
  let _partId = import.meta.env.ENV_DEFAULT_PART_ID;
  const s = useUserModel.getState();

  if (shop) {
    _partId = shop?.split('.')?.[0];
  } else if (s.user?.email) {
    _partId = s.user?.email;
  }

  return _partId;
};

// 是否在 shopify 中打开
export const inShopify = getUrlParams('embedded') === '1';

//shopify
export const appId = import.meta.env.ENV_SHOPIFY_APP_ID;

// app install base url
export const installApiUrl = import.meta.env.ENV_INSTALL_API_URL;
export const installBaseUrl = `${installApiUrl}/beta/core/${endpointId}`;

//Ai sdk version
export const sdkVersion = import.meta.env.ENV_AI_SDK_VERSION;

//Ai sdk url
export const sdkUrl = `${import.meta.env.ENV_AI_SDK_URL}/sdk-${sdkVersion}.iife.js`;

//语言
export const lng = getUrlParams('locale');

export const appName = import.meta.env.ENV_APP_NAME;

