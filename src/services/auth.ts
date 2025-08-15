import qs from 'qs';

const apiUrl = 'https://09sw8qvvg0.execute-api.us-west-2.amazonaws.com/beta/core/openai';

// 检查当前店铺是否需要授权
export const checkShopAuthApi = (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return fetch(`${apiUrl}/app_check${query}`);
}