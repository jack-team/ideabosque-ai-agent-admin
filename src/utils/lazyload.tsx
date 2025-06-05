import { lazy, Suspense } from 'react';

type LoadFn = Parameters<typeof lazy>[0];

export const lazyLoad = (load: LoadFn) => {
  const LazyComponent = lazy(load);
  return (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
}

export default lazyLoad;