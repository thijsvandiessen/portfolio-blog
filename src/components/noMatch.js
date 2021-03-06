import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <main className="noMatch">
        <article className="content-container">
          <h1>404 - This page does not exist</h1>
          <h2>No match for <code>{document.location.pathname}</code></h2>
          <p>Go back <Link to="/" title="My portfolio">home</Link></p>
        </article>
      </main>
    );
  }
}

export default NoMatch;
