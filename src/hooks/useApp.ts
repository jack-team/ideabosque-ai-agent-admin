import { useSearchParams } from 'react-router';
import { appId } from '@/env';

export const useAppId = () => {
  return [appId];
}

export const useShop = () => {
  const [searchParams] = useSearchParams();
  return [searchParams.get('shop')];
}