import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserModel } from '@/store/user';

export const NoAuthWrapper: FC = () => {
  const token = useUserModel(s => s.token);
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
}

export const AuthWrapper: FC = () => {
  const token = useUserModel(s => s.token);
  return !token ? <Outlet /> : <Navigate to="/" replace />;
}