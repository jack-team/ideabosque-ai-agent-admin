import type { FC, PropsWithChildren } from 'react';
import { useShop } from '@/hooks/useAuth';
import JumpAuth from './jump';

const Auth: FC<PropsWithChildren> = (props) => {
  const [shop] = useShop();

  if (!shop) {
    return props.children;
  }
  
  return (
    <JumpAuth>
      {props.children}
    </JumpAuth>
  );
}

export default Auth;