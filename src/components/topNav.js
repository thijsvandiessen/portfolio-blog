import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import logoWebP from '../images/logo.webp';


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
