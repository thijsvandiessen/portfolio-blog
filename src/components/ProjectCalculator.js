import React, {Component} from 'react';
import GradientHeader from './GradientHeader';
import Calculator from './Calculator';

/**
 * A class that returns my calculator project
 */
class ProjectCalculator extends Component {

  /**
    * It returns my calculator
    * @return {object}
    */
  render() {
    const heading = {
      title: 'My react calculator',
      subTitle: 'What happens when I want to create a calculator with React?',
    };

    return (
      <main>
        <GradientHeader heading={heading} />
        <section className="content-container">
          <Calculator/>
        </section>
      </main>
    );
  };
};

export default ProjectCalculator;
