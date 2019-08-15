import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import lazyLoad from '../utils/lazyLoad';

import ScrollToTop from './scrollToTop';
import TopNav from './topNav';
import Navigation from './navigation';
import Routes from './routes';
import Footer from './footer';

class App extends Component {
  componentDidMount() {
    // lazyload images
    lazyLoad();
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
