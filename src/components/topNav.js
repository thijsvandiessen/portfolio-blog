import React, {Component} from 'react';
import logo from '../images/logo.png';

class TopNav extends Component {
  render() {
    return (
      <header className="topNav">
        <img alt="logo" className="logo" src={logo}/>
      </header>
    );
  }
}

export default TopNav;
