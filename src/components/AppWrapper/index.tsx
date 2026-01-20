import { type FC, type PropsWithChildren } from 'react';
import { useMount } from 'ahooks';
import Spinner from '@/components/Spinner'
import { useAppInstallModel } from '@/store/app-install';

const AppWrapper: FC<PropsWithChildren> = (props) => {
  const loading = useAppInstallModel(s => s.loading);
  const appIntsall = useAppInstallModel(s => s.appIntsall);

  useMount(appIntsall);

  if (loading) {
    return <Spinner className="spinner" type="infinity-spin" />;
  }

  return props.children;
}

export default AppWrapper;