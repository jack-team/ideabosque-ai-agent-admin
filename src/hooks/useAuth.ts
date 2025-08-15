import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router';
import { checkShopAuthApi } from '@/services/auth';

const appId = import.meta.env.ENV_SHOPIFY_APP_ID;

export const useAuth = () => {
  const [searchParams] = useSearchParams();
  const shop = searchParams.get('shop') || 'airobot-store.myshopify.com';

  const { loading, data } = useRequest(async () => {
    const result = await checkShopAuthApi({ appId, shop });
    const json = await result.json();
    return json;
  });

  return {
    loading,
    authed: data?.authed
  }
}