import React, { Component } from 'react';
import GradientHeader from './gradientHeader-tmp';

class HomePage extends Component {

  render() {

    const heading = {
      title: "Hi I'm Thijs van Diessen, a more creative front end developer",
      subTitle: "I like to design and develop awesome user experiences and I'm currently looking for a new challenge.",
      huge: true,
      link: {
        text: 'My projects',
        link: '/projects',
        title: 'Discover some of my projects',
      },
    }

    return (
      <GradientHeader heading={heading} />
    );
  }
}

export default HomePage;
