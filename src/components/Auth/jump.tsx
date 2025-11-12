import qs from 'qs';
import type { FC, PropsWithChildren } from 'react';
import { useUpdateEffect, useMemoizedFn } from 'ahooks';
import Spinner from '../Spinner';
import { useAuth } from '@/hooks/useAuth';
import { apiAuthUrl } from '@/env';

const JumpAuth: FC<PropsWithChildren> = (props) => {
  const { loading, authed, appId, shop } = useAuth();

  const toAuth = useMemoizedFn(() => {
    const search = qs.stringify({ shop, appId });
    const url = `${apiAuthUrl}/app_callback?${search}`;
    open(url, '_top');
  });

  useUpdateEffect(() => {
    if (!authed && !loading) toAuth();
  }, [authed, loading]);

  if (loading || !authed) {
    return (
      <div className="lazy-loading">
        <Spinner size={48} />
      </div>
    );
  }

  return props.children;
}

export default JumpAuth;