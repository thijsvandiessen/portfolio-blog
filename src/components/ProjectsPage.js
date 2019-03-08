import React, { Component } from 'react';
import GradientHeader from './GradientHeader';
import Projects from './Projects';


class ProjectPage extends Component {

  render() {

    const heading = {
      title: "My projects",
      subTitle: "Some of my projects",
      button: {
        text: 'Or check out my GitHub account',
        link: 'https://github.com/thijsvandiessen'
      },
    }

    return (
      <main>
        <GradientHeader heading={heading}/>
        <Projects/>
      </main>
    );
  }
}

export default ProjectPage;
