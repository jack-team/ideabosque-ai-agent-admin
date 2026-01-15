import qs from 'qs';
import { appInstallUrl } from '@/env';

// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await fetch(`${appInstallUrl}/app_check${query}`);
  const json = await result.json();
  return json as { authed: boolean };
}