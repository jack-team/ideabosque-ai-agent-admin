import qs from 'qs';
import { appInstallBaseUrl, apiKey } from '@/env';

const headers: Record<string, any> = {
  'x-api-key': apiKey
}

// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await fetch(`${appInstallBaseUrl}/app_check${query}`, { headers });
  const json = await result.json();
  return json as { authed: boolean };
}