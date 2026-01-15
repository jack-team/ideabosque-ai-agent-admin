import qs from 'qs';
import axios from 'axios';
import { installBaseUrl } from '@/env';


// 安装 App
export const appInstallApi = async (params: Record<string, any>) => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  const result = await axios.get<{ authed: boolean }>(`${installBaseUrl}/app_check${query}`);
  return result.data;
}