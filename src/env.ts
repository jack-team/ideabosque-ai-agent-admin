import { getUrlParams } from '@/utils';
import { useUserModel } from '@/store/user';

export const apiKey = import.meta.env.ENV_API_KEY;
export const apiBaseUrl = import.meta.env.ENV_API_BASE_URL;
export const endpointId = import.meta.env.ENV_API_ENDPOINT_ID;
export const defaultPartId = import.meta.env.ENV_DEFAULT_PART_ID;

// url params
export const shop = getUrlParams('shop');

// 获取 partId
export const getPartId = () => {
  const s = useUserModel.getState();
  let pId: string | undefined;

  if (shop) {
    pId = shop.split('.')?.[0];
  } else if (s.token) {
    pId = s.token.userName;
  }
  return pId || defaultPartId;
}

// 是否在 shopify 中打开
export const inShopify = shop && getUrlParams('embedded') === '1';

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

