import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import lazyLoad from '../utils/lazyLoad';

import ScrollToTop from './ScrollToTop';
import TopNav from './TopNav';
import Navigation from './Navigation';
import Routes from './Routes';
import Footer from './Footer';

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
