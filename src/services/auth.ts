import qs from 'qs';
import axios from 'axios';
import { installBaseUrl } from '@/env';
import type { AppInstalledResult } from '@/typings/app-install';


// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await axios.get<AppInstalledResult>(`${installBaseUrl}/app_check${query}`);
  return result.data;
}