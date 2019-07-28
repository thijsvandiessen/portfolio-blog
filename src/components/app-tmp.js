import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import lazyLoad from '../utils/lazyLoad';

import ScrollToTop from './scrollToTop-tmp';
import TopNav from './topNav-tmp';
import Navigation from './navigation-tmp';
import Routes from './routes-tmp';
import Footer from './footer-tmp';

class App extends Component {

  componentDidMount() {

    // lazyload images
    lazyLoad()
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <TopNav />
          <Navigation />
          <Routes />
          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
