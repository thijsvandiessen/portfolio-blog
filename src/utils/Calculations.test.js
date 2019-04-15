import * as calc from './Calculations';

test('adds 1 + 2 to equal 3', () => {
  expect(calc.sum(1, 2)).toBe(3);
});

test('substracts 20 - 5 to equal 15', () => {
  expect(calc.subtract(20, 5)).toBe(15);
});

test('multiplies 10 * 2 to equal 20', () => {
  expect(calc.multiply(10, 2)).toBe(20);
});

test('divides 20 / 2 to equal 10', () => {
  expect(calc.divide(20, 2)).toBe(10);
});


