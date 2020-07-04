import React, {Component} from 'react';
import GradientHeader from './gradientHeader';
import Calculator from './calculator';

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
      subTitle: 'Floating-point arithmetic is hard.',
    };

    return (
      <main>
        <GradientHeader heading={heading} />
        <section className="content-container">
          <Calculator />
        </section>
      </main>
    );
  };
};

export default ProjectCalculator;
