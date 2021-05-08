import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      isToggleOn: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <nav data-nav={(this.state.isToggleOn ? 'on' : 'off')} className="navigation">
        <button className="nav-button" onClick={this.handleClick}>
          menu
        </button>

        <ul data-nav-list={(this.state.isToggleOn ? 'visible' : 'hidden')}>
          <li>
            <h2>
              <NavLink onClick={this.handleClick} activeClassName="selected" to="/">
                My portfolio
              </NavLink>
            </h2>
          </li>
          <li>
            <NavLink onClick={this.handleClick} activeClassName="selected" to="/projects">
              My projects
            </NavLink>
          </li>
          <li>
            <NavLink onClick={this.handleClick} activeClassName="selected" to="/about">
              About me
            </NavLink>
          </li>
          <li>
            <NavLink onClick={this.handleClick} activeClassName="selected" to="/contact">
              Contact me
            </NavLink>
          </li>
        </ul>

      </nav>
    );
  }
}

export default Navigation;
