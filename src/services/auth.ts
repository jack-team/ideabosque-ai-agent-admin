import qs from 'qs';
import { installBaseUrl } from '@/env';


// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await fetch(`${installBaseUrl}/app_check${query}`);
  const json = await result.json();
  return json as { authed: boolean };
}