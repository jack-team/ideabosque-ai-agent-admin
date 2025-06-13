import { lazy, Suspense, useMemo } from 'react';
import { Spinner } from '@/components';

type LoadFn = Parameters<typeof lazy>[0];

export const lazyLoad = (load: LoadFn) => {
  return (props: Record<string, any>) => {
    const Component = useMemo(() => lazy(load), []);

    const renderloading = () => {
      return (
        <div className="lazy-loading">
          <Spinner size={48} />
        </div>
      );
    }

    return (
      <Suspense fallback={renderloading()}>
        <Component {...props}/>
      </Suspense>
    );
  }
}

export default lazyLoad;