import { lazy, Suspense } from 'react';
import { Spinner } from '@shopify/polaris';

type LoadFn = Parameters<typeof lazy>[0];

export const lazyLoad = (load: LoadFn) => {
  const LazyComponent = lazy(load);

  const renderloading = () => {
    return (
      <div className="app-page-loading">
        <Spinner />
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