import qs from 'qs';
import { appInstallUrl, endpointId } from '@/env';

// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await fetch(`${appInstallUrl}/beta/core/${endpointId}/app_check${query}`);
  const json = await result.json();
  return json as { authed: boolean };
}