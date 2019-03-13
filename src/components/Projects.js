import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Projects extends Component {

  render() {

    return (
      <section className="content-container projects">

      <div>
        <h2>This portfolio</h2>
        <p>I started to play with React and then this happend.</p>
      </div>

      <div>
        <h2>Older portfolio</h2>
        <p>A PHP based portfolio with some older projects.</p>
        <a href="http://thijsvandiessen.nl">
          Read more...
        </a>
      </div>
      <div>
        <h2>Sound project</h2>
        <p>A simple oscillator that I use to tune my violin or double bass.
        In most orchestras 442 hertz is the A, normaly this is 440 hertz. This simply because the woodwinds like it this way. And we like it if the woodwinds are in tune.</p>
        <Link to="projects/sound-project">
          Read more...
        </Link>
      </div>
      <div>
        <h2>To do project</h2>
        <p>How easy is it to create a to do app?</p>
        <Link to="projects/my-to-do-app">
          Read more...
        </Link>
      </div>
      </section>
    );
  }
}

export default Projects;
