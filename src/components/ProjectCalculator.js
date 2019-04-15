import React, {Component} from 'react';
import GradientHeader from './GradientHeader';
import * as calc from '../utils/Calculations';

/**
 * A class that returns my calculator project
 */
class ProjectCalculator extends Component {
  /**
    * Constructor function
    */
  constructor() {
    super();
    this.state = {
      firstNumber: null,
      secondNumber: null,
      operator: null,
    };

    this.store = this.store.bind(this);
    this.storeNumber = this.storeNumber.bind(this);
  };

  /**
  * initialize
  */
  componentDidMount() {
    this.action();
  };

  /**
    * It registers a value
    * @return {void} the action
    */
  action() {
    const buttons = document.querySelector('.calculator__app');
    buttons.addEventListener('click', (event) => {
      // when we have a false input, return
      if (event.target.innerText.length > 1) return;

      // store the target value
      this.store(event.target.value);
    });
  };

  /**
  * store action or number
  * @param {input} number or action
  * @return {void} stores the number or action
  */
  store(input) {
    // clear
    if (input === 'clear') {
      this.setState({
        firstNumber: null,
        secondNumber: null,
        operator: null,
      });
      return;
    }

    // calculate
    if (input === 'calculate') {
      this.calculate();
      return;
    }

    // if the input is a decimal
    if (input === 'decimal') {
      this.storeNumber('.');
      return;
    }

    // store this number
    if (!isNaN(input)) {
      this.storeNumber(input);
      return;
    }

    // if the input is an action, store this action
    if (isNaN(input)) {
      if (!this.state.firstNumber) return;
      this.setState(() => ({
        operator: input,
      }));
      return;
    }
  }

  /**
  * store number or operator
  * @param {int} number
  * @return {void} stores the number or operator
  */
  storeNumber(number) {
    // if there is an operator, store secondNumber
    if (this.state.operator) {
      if (this.state.secondNumber === null) {
        this.setState({
          secondNumber: number,
        });
      } else {
        if (number.includes('.') && this.state.secondNumber.includes('.')) {
          return;
        }
        this.setState((state) => ({
          secondNumber: state.secondNumber + number,
        }));
      }
      return;
    }

    // store first number
    // don't start a number with a zero
    if (this.state.firstNumber === null) {
      this.setState({
        firstNumber: number,
      });
    } else {
      if (number.includes('.') && this.state.firstNumber.includes('.')) {
        console.log('firstnumber allready includes a decimal');
        return;
      }
      this.setState((state) => ({
        firstNumber: state.firstNumber + number,
      }));
    }
  };

  /**
  * calculate
  * @return {void} stores the answer in the firstNumber state
  */
  calculate() {
    // I can't calculate a single number
    if (!this.state.secondNumber) return;

    const a = parseFloat(this.state.firstNumber);
    const b = parseFloat(this.state.secondNumber);

    if (this.state.operator === 'add') {
      const ans = calc.add(a, b);
      this.setState({
        firstNumber: ans,
        secondNumber: null,
        operator: null,
      });
    }

    if (this.state.operator === 'subtract') {
      const ans = calc.subtract(a, b);
      this.setState({
        firstNumber: ans,
        secondNumber: null,
        operator: null,
      });
    }

    if (this.state.operator === 'multiply') {
      const ans = calc.multiply(a, b);
      this.setState({
        firstNumber: ans,
        secondNumber: null,
        operator: null,
      });
    }

    if (this.state.operator === 'divide') {
      const ans = calc.divide(a, b);
      this.setState({
        firstNumber: ans,
        secondNumber: null,
        operator: null,
      });
    }
  }

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
          <div className="calculator__app">
            <div className="calculator__display">
              {this.state.firstNumber} {this.state.operator} {this.state.secondNumber >= 0 && 
                <span>{this.state.secondNumber}</span>
              }</div>
            <div className="calculator__keys">
              <div className="calculator__numbers">
                <button value="7">7</button>
                <button value="8">8</button>
                <button value="9">9</button>
                <button value="4">4</button>
                <button value="5">5</button>
                <button value="6">6</button>
                <button value="1">1</button>
                <button value="2">2</button>
                <button value="3">3</button>
                <button value="0">0</button>
                <button value="decimal">.</button>
                <button value="calculate">=</button>
              </div>
              <div className="calculator__operators">
                <button value="clear">C</button>
                <button value="divide">÷</button>
                <button value="multiply">&times;</button>
                <button value="subtract">-</button>
                <button value="add">+</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };
};

export default ProjectCalculator;
