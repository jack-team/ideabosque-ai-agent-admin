import { lazy, Suspense } from 'react';
import { Spinner } from '@/components';

type LoadFn = Parameters<typeof lazy>[0];

export const lazyLoad = (load: LoadFn) => {
  const LazyComponent = lazy(load);

  const renderloading = () => {
    return (
      <div className="lazy-loading">
        <Spinner size={48}/>
      </div>
    );
  }

  return (
    <Suspense fallback={renderloading()}>
      <LazyComponent />
    </Suspense>
  );
}

export default lazyLoad;