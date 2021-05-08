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
          <source srcSet={`${logoWebp}, ${logoWebp2x} 2x`} type="image/webp" />
          <source srcSet={`${logo}, ${logo2x} 2x`} />
          <img src={logo} alt="logo" width={100} height={100} />
        </picture>
      </div>
    );
  }
}

export default TopNav;
