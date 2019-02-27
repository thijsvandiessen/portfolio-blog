import React, { Component } from 'react';
import GradientHeader from './GradientHeader';

class HomePage extends Component {

  render() {

    const heading = {
      title: "Hi I'm Thijs van Diessen, a more creative front end developer",
      subTitle: "I like to design and develop awesome user experiences and I'm currently looking for a new challenge.",
      huge: true,
    }

    return (<GradientHeader heading={heading} />)
  }
}

export default HomePage;
