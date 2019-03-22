import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Projects extends Component {

  render() {

    return (
      <section className="content-container projects">
        <div>
          <h2>This portfolio</h2>
          <p>I started to play with React and Webpack and then this happend. I first wanted to create a blog with articlesm written in Markdown stored somewhere else. So I did.</p>
          <Link to="my-writings" tite="Read my articles written in Markdown">
            Read more...
          </Link>
        </div>
        <div>
          <h2>Older portfolio</h2>
          <p>My first portfolio with some older projects. Written in PHP.</p>
          <a href="http://thijsvandiessen.nl" title="Discover my old portfolio">
            Read more...
          </a>
        </div>
        <div>
          <h2>Sound project</h2>
          <p>A simple oscillator that I use to tune my violin or double bass.
          In most orchestras 442 hertz is the A, normaly this is 440 hertz. This simply because the woodwinds like it this way. And we like it if the woodwinds are in tune.</p>
          <Link to="projects/sound-project" title="Discover my sound project">
            Read more...
          </Link>
        </div>
        <div>
          <h2>To do project</h2>
          <p>How easy is it to create a to do app?</p>
          <Link to="projects/my-to-do-app" title="Discover my to do app">
            Read more...
          </Link>
        </div>
        <div>
          <h2>Image optimizations to improve SEO</h2>
          <p>What are the most inpactfull SEO optimizations that you can apply to images? This is my implementation.</p>
          <Link to="projects/image-optimizations-to-improve-seo" title="Read about my lazyload implementation and other image optimizations">
            Read more...
          </Link>
        </div>
      </section>
    );
  }
}

export default Projects;
