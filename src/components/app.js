import React, { Component, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import lazyLoadImages from "../utils/lazyLoadImages";

const TopNav = React.lazy(() =>
  import(/* webpackChunkName: 'topNav' */ "./topNav")
);

const Navigation = React.lazy(() =>
  import(/* webpackChunkName: 'navigation' */ "./navigation")
);

const Routes = React.lazy(() =>
  import(/* webpackChunkName: 'routes' */ "./routes")
);

class App extends Component {
  componentDidMount() {
    // lazyload images
    lazyLoadImages();
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<header className="topNav" />}>
          <TopNav />
        </Suspense>
        <Suspense fallback={<nav className="navigation" />}>
          <Navigation />
        </Suspense>
        <Suspense fallback={<main />}>
          <Routes />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
