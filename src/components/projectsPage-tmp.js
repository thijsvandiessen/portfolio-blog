import React, { Component } from 'react';
import GradientHeader from './gradientHeader-tmp';
import Projects from './projects-tmp';


class ProjectPage extends Component {

  render() {

    const heading = {
      title: "My projects",
      subTitle: "These are some of my projects",
      button: {
        text: 'Or check out my GitHub account',
        link: 'https://github.com/thijsvandiessen',
        title: 'Go to my Github account',
      },
    }

    return (
      <main>
        <GradientHeader heading={heading} />
        <Projects />
      </main>
    );
  }
}

export default ProjectPage;
