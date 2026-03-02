import { type FC } from 'react';
import { Link as LinkReact, type LinkProps } from 'react-router-dom';
import { getTo } from '@/hooks/useNavigate';
import { inShopify } from '@/env';

export const Link: FC<LinkProps> = (props) => {
  const { to, ...rest } = props;
  return <LinkReact to={inShopify ? getTo(to) : to} {...rest} />;
}

export default Link;