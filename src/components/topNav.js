import React, {Component} from 'react';
import logo from '../images/logo.png';
import logo2x from '../images/logo-2x.png';

import logoWebp from '../images/logo.webp';
import logoWebp2x from '../images/logo-2x.webp';

class TopNav extends Component {
  render() {
    return (
      <div className="topNav">
        <picture className="logo">
          <source srcset={`${logoWebp}, ${logoWebp2x} 2x`} type="image/webp" />
          <source srcset={`${logo}, ${logo2x} 2x`} />
          <img src={logo} alt="logo" />
        </picture>
      </div>
    );
  }
}

export default TopNav;
