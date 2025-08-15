import type { FC, PropsWithChildren } from 'react';
import { useUpdateEffect } from 'ahooks';
import Spinner from '../Spinner';
import { useAuth } from '@/hooks/useAuth';

const JumpAuth: FC<PropsWithChildren> = (props) => {
  const { loading, authed } = useAuth();

  useUpdateEffect(() => {
    if (!authed) {
      open('https://fb8ffca93c9f.ngrok-free.app/', '_self')
    }
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