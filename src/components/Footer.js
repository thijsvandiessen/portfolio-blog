import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          Designed and developed by <Link to="/about" rel="author">Thijs van Diessen</Link>
        </p>
      </footer>
    );
  }
}

export default Footer;
