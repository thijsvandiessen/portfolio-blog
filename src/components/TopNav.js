import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
