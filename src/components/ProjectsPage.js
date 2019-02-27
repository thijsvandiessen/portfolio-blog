import React, { Component } from 'react';
import GradientHeader from './GradientHeader';


class Projects extends Component {

  render() {

    const heading = {
      title: "My projects",
      button: {
        text: 'Check out my GitHub account',
        link: 'https://github.com/thijsvandiessen'
      },
      huge: true,
    }

    return (
      <main>
        <GradientHeader heading={heading}/>
      </main>
    );
  }
}

export default Projects;
