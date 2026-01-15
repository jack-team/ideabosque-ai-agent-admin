import { getUrlParams } from '@/utils';

export const apiKey = import.meta.env.ENV_API_KEY;
export const apiBaseUrl = import.meta.env.ENV_API_BASE_URL;
export const endpointId = import.meta.env.ENV_API_ENDPOINT_ID;

// url params
export const shop = getUrlParams('shop');
export const partId = shop?.split('.')?.[0] || 'neprodai';
// 是否在 shopify 中打开
export const inShopify = getUrlParams('embedded') === '1';

//shopify
export const appId = import.meta.env.ENV_SHOPIFY_APP_ID;

// app install url
export const appInstallUrl = `${import.meta.env.ENV_APP_INSTALL_URL}/beta/core/${endpointId}`;

//Ai sdk version
export const sdkVersion = import.meta.env.ENV_AI_SDK_VERSION;

//Ai sdk url
export const sdkUrl = `${import.meta.env.ENV_AI_SDK_URL}/sdk.iife.js?v=${sdkVersion}`;

