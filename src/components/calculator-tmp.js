import React, { Component } from 'react';
import * as calc from '../utils/calculations-tmp';

/**
 * A class that returns my calculator project
 */
class Calculator extends Component {
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
  };

  /**
  * initialize, add event listeners
  */
  componentDidMount() {
    this.watch();
  };

  /**
    * Add event listener to buttons
    * @return {void} the action
    */
  watch() {
    const buttons = document.querySelector('.calculator__app');
    buttons.addEventListener('click', (event) => {
      // when we have a false input, return
      if (event.target.innerText.length > 1) return;

      // store the target value
      this.registerAction(event.target.value);
    });
  };

  /**
  * register action or number
  * @param {string} input - number or action
  * @return {void} decides what to do
  */
  registerAction(input) {
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

    // if the input is an action, store this action
    if (isNaN(input) && input !== 'decimal') {
      this.storeOperator(input);
      return;
    }

    // if the input is a decimal
    if (input === 'decimal') {
      this.storeFirstNumber('.');
      return;
    }

    this.storeFirstNumber(input);
  }

  /**
  * Store the first number
  * @param {string} number - the number that needs to be stored
  * @return {void} stores the number
  */
  storeFirstNumber(number) {

    // convert to string
    let num = number;
    if (typeof number === 'number') num = number.toString();
    // store second number
    if (this.state.operator) return this.storeSecondNumber(num);
    // store first number
    // don't start a number with a zero
    if (this.state.firstNumber === null) {
      this.setState({
        firstNumber: num,
      });
    } else {
      // no dubble dots
      if (num.includes('.') && this.state.firstNumber.includes('.')) return;
      this.setState((state) => ({
        firstNumber: state.firstNumber + num,
      }));
    }
  }

  /**
  * Store the second number
  * @param {string} number - the number that needs to be stored
  * @return {void} stores the number
  */
  storeSecondNumber(number) {
    // the first number
    if (this.state.secondNumber === null && !number.includes('.')) {
      this.setState({
        secondNumber: number,
      });
      return;
    }
    // if the first number is a dot, append a zero
    if (this.state.secondNumber === null && number.includes('.')) {
      this.setState({
        secondNumber: 0 + number,
      });
      return;
    }

    // if the first number is a zero
    if (this.state.secondNumber == 0 && number == 0) {
      this.setState({
        secondNumber: number,
      });
      return;
    }

    // If there is already a dot, return
    if (number.includes('.') && this.state.secondNumber.includes('.')) {
      return;
    }

    this.setState((state) => ({
      secondNumber: state.secondNumber + number,
    }));
  }

  /**
  * Store the operator
  * @param {string} operator - the operator that needs to be stored
  * @return {void} stores the operator
  */
  storeOperator(operator) {
    // we need a first number
    if (!this.state.firstNumber) return;
    // remove ugly trailing dot
    if (this.state.firstNumber.endsWith('.')) {
      this.setState((state) => ({
        firstNumber: state.firstNumber.slice(0, -1),
      }));
    }
    this.setState(() => ({
      operator: operator,
    }));
  }

  /**
  * calculate
  * @return {void} returns the answer
  */
  calculate() {
    // I can't calculate a single number
    if (!this.state.secondNumber) return;

    // create a number from a string
    const a = parseFloat(this.state.firstNumber);
    const b = parseFloat(this.state.secondNumber);

    if (this.state.operator === 'add') {
      this.answer(calc.add(a, b));
    } else if (this.state.operator === 'subtract') {
      this.answer(calc.subtract(a, b));
    } else if (this.state.operator === 'multiply') {
      this.answer(calc.multiply(a, b));
    } else if (this.state.operator === 'divide') {
      this.answer(calc.divide(a, b));
    }
  }

  /**
  * Stores the answer as first number and clears the rest
  * @param {int} ans - the answer that needs to be stored
  * @return {void} stores the answer in the firstNumber state
  */
  answer(ans) {
    // convert to string
    let num = ans;
    if (typeof ans === 'number') num = ans.toString();

    this.setState(() => ({
      firstNumber: num,
      secondNumber: null,
      operator: null,
    }));
  }

  /**
    * It returns my calculator
    * @return {object}
    */
  render() {
    return (
      <div className="calculator__app">
        <div className="calculator__display">
          <span>{this.state.firstNumber} </span>
          {this.state.operator}
          {this.state.secondNumber >= 0 &&
            <span> {this.state.secondNumber}</span>
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
    );
  };
};

export default Calculator;
