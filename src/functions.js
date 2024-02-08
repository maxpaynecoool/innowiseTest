const applyOperator = (operand1, operand2, operator) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      if (operand2 !== 0) {
        return operand1 / operand2;
      }
      return 'Деление на ноль';
    case '%':
      return (operand1 * operand2) / 100;
    default:
      return 'Неизвестный оператор';
  }
};

export function evaluateExpression(expression) {
  const operators = ['+', '-', '*', '/', '%'];
  const operatorStack = [];
  const numberStack = [];
  let number = '';
  let isNegative = false;
  let lastCharWasOperator = false;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (!isNaN(char) || char === '.') {
      number += char;
      lastCharWasOperator = false;
    } else if (
      char === '-' &&
      (i === 0 || operators.includes(expression[i - 1]))
    ) {
      isNegative = true;
    } else if (operators.includes(char)) {
      if (lastCharWasOperator) {
        return 'Ошибка';
      }
      lastCharWasOperator = true;
      if (number !== '') {
        numberStack.push(parseFloat(number) * (isNegative ? -1 : 1));
        number = '';
        isNegative = false;
      }

      while (
        operatorStack.length > 0 &&
        operators.indexOf(operatorStack[operatorStack.length - 1]) >=
          operators.indexOf(char)
      ) {
        const operator = operatorStack.pop();
        const operand2 = numberStack.pop();
        const operand1 = numberStack.pop();
        const result = applyOperator(operand1, operand2, operator);
        numberStack.push(result);
      }
      operatorStack.push(char);
    }
  }

  if (number !== '') {
    numberStack.push(parseFloat(number) * (isNegative ? -1 : 1));
  }

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const operand2 = numberStack.pop();
    const operand1 = numberStack.pop();
    const result = applyOperator(operand1, operand2, operator);
    numberStack.push(result);
  }

  if (numberStack.length === 1) {
    return numberStack[0];
  }
  return 'Ошибка: некорректное выражение';
}
