import qs from 'qs';
import type { FC, PropsWithChildren } from 'react';
import { useUpdateEffect, useMemoizedFn } from 'ahooks';
import Spinner from '../Spinner';
import { useAuth } from '@/hooks/useAuth';

const JumpAuth: FC<PropsWithChildren> = (props) => {
  const { loading, authed, appId, shop } = useAuth();

  const toAuth = useMemoizedFn(() => {
    const search = qs.stringify({ shop, appId }, { addQueryPrefix: true });
    const url = `https://09sw8qvvg0.execute-api.us-west-2.amazonaws.com/beta/core/openai/app_callback${search}`;
    open(url, '_top')
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