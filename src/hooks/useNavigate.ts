import qs from 'qs';
import { useMemoizedFn } from 'ahooks';
import { type To, type NavigateOptions, useNavigate as _useNavigate } from 'react-router';
import { isURL } from '@/utils';
import { inShopify } from '@/env'

const getUrlParams = (url: URL) => {
  const params = url.searchParams;
  const keys = [...params.keys()];

  return keys.reduce((acc, key) => {
    return { ...acc, [key]: params.get(key) };
  }, {} as Record<string, any>);
}

export const getTo = (to: To) => {
  const origin = location.origin;
  const oUrl = new URL(location.href);

  const urlStr = (() => {
    if (typeof to === 'string') return to;
    return [to.pathname, to.search].filter(v => v).join('');
  })();

  const currentUrl = new URL(urlStr,
    isURL(urlStr) ? undefined : origin
  );

  const search = qs.stringify({
    ...getUrlParams(oUrl),
    ...getUrlParams(currentUrl)
  }, { addQueryPrefix: true });

  return currentUrl.pathname + search;
}

export const useNavigate = () => {
  const navigate = _useNavigate();

  return useMemoizedFn((to: To, options?: NavigateOptions) => {
    if (inShopify) to = getTo(to);
    navigate(to, options);
  });
}