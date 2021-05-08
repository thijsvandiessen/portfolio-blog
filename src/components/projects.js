import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/**
 * A class that returns the projects component
 */
class Projects extends Component {
  /**
   * It returns a list of my projects
   * @return {object} jsx
  */
  render() {
    return (
      <section className="content-container projects">
        <div>
          <h2>Making a oscillator</h2>
          <p>A simple oscillator that I use to tune my violin or double bass.
          In most orchestras 442 hertz is the A, normaly this is 440 hertz. This simply because the woodwinds like it this way. And we like it if the woodwinds are in tune.</p>
          <Link to="projects/sound-project" title="Discover my sound project">
            Read more...
          </Link>
        </div>
        <div>
          <h2>To do project</h2>
          <p>How easy is it to create a to do app with React?</p>
          <Link to="projects/my-to-do-app" title="Discover my to do app">
            Read more...
          </Link>
        </div>
        <div>
          <h2>Lazy loading images</h2>
          <p>If you implement lazy loading, does it actually attract more traffic? I implemented and documented my optimizations.</p>
          <Link to="projects/lazy-loading-images-to-make-your-site-fast" title="Read about my lazyload implementation and other image optimizations">
            Read more...
          </Link>
        </div>
        <div>
          <h2>React calculator</h2>
          <p>How easy is it to create a calculator with React?</p>
          <Link to="projects/my-react-calculator" title="Discover my react calculator app">
            Read more...
          </Link>
        </div>
      </section>
    );
  }
}

export default Projects;
