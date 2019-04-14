import React, {Component} from 'react';
import GradientHeader from './GradientHeader';

/**
 * A class that returns my calculator project
 */
class ProjectTodo extends Component {
  /**
    * Constructor function
    */
  constructor() {
    super();
  };

  /**
    * It returns my calculator
    * @return {object}
    */
  render() {
    const heading = {
      title: 'My react calculator',
      subTitle: 'What happends when I want to create a calculator with React?',
    };

    return (
      <main>
        <GradientHeader heading={heading} />
        <section className="content-container">
        </section>
      </main>
    );
  };
};

export default ProjectTodo;
