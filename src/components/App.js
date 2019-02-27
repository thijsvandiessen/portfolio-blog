import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Navigation from './Navigation';
import Routes from './Routes';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navigation />
          <Routes />
          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
