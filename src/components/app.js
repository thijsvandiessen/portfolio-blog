import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import lazyLoadImages from '../utils/lazyLoadImages';

import ScrollToTop from './scrollToTop';

const TopNav = React.lazy(() => import(
  /* webpackChunkName: 'topNav' */ "./topNav"));

const Navigation = React.lazy(() => import(
  /* webpackChunkName: 'navigation' */ "./navigation"));

const Routes = React.lazy(() => import(
  /* webpackChunkName: 'routes' */ "./routes"));

const Footer = React.lazy(() => import(
  /* webpackChunkName: 'footer' */ "./footer"));

class App extends Component {
  componentDidMount() {
    // lazyload images
    lazyLoadImages();
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Suspense fallback={<div>...</div>}>
            <TopNav />
          </Suspense>
          <Suspense fallback={<div>.</div>}>
            <Navigation />
          </Suspense>
          <Suspense fallback={<div>.</div>}>
            <Routes />
          </Suspense>
          <Suspense fallback={<footer>Designed and developed by Thijs van Diessen</footer>}>
            <Footer />
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
