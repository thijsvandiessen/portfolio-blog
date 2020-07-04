import React, { Suspense } from 'react';
import Loading from './loading';

const LazyLoad = (Component) => {
  return props => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}

export default LazyLoad;
