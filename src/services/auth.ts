import qs from 'qs';
import { apiAuthUrl } from '@/env';

// 检查当前店铺是否需要授权
export const checkShopAuthApi = (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return fetch(`${apiAuthUrl}/app_check${query}`);
}