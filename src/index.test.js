const {Calculator} = require('./forTest')

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('add', () => {
    expect(calculator.execute('add', 1, 2)).toBe(3);
  });

  test('subtract', () => {
    expect(calculator.execute('subtract', 5, 2)).toBe(3);
  });

  test('multiply', () => {
    expect(calculator.execute('multiply', 3, 2)).toBe(6);
  });

  test('divide', () => {
    expect(calculator.execute('divide', 6, 2)).toBe(3);
  });

  test('percent', () => {
    expect(calculator.execute('percent', 50, 50)).toBe(25);
  });
  test('square', () => {
    expect(calculator.execute('square', 5)).toBe(25);
  });
  test('cube', () => {
    expect(calculator.execute('cube', 5)).toBe(125);
  });
  test('sqrt', () => {
    expect(calculator.execute('sqrt', 9)).toBe('3.00000');
  });
  test('cbrt', () => {
    expect(calculator.execute('cbrt', 8)).toBe('2.00000');
  });
  test('root', () => {
    expect(calculator.execute('root', 9, 2)).toBe('3.00000');
  });
  test('factorial', () => {
    expect(calculator.execute('factorial', 4)).toBe(24);
  });
  test('pow', () => {
    expect(calculator.execute('pow', 4, 3)).toBe(64);
  });
  test('tenPow', () => {
    expect(calculator.execute('tenPow', 3)).toBe(1000);
  });
  test('reciprocal', () => {
    expect(calculator.execute('reciprocal', 10)).toBe(0.1);
  });
});