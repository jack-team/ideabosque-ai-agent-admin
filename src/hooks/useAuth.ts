import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router';
import { checkShopAuthApi } from '@/services/auth';
import { appId } from '@/env';


export const useAppId = () => {
  return [appId];
}

export const useShop = () => {
  const [searchParams] = useSearchParams();
  return [searchParams.get('shop')];
}

export const useAuth = () => {
  const [shop] = useShop();
  const [appId] = useAppId();

  const { loading, data } = useRequest(async () => {
    const result = await checkShopAuthApi({ appId, shop });
    const json = await result.json();
    return json;
  });

  return {
    loading,
    appId,
    shop,
    authed: data?.authed
  }
}