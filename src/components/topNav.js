import React, {Component} from 'react';
import logo from '../images/logo.png';

class TopNav extends Component {
  render() {
    return (
      <header className="topNav">
        <img alt="logo" className="logo" src={logo} width="100" height="100"/>
      </header>
    );
  }
}

export default TopNav;
