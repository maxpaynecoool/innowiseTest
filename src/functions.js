function applyOperator(operand1, operand2, operator) {
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
            case '+/-':
                return -operand1
        default:
            return 'Неизвестный оператор';
    }
}

export function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/', '%'];
    const operatorArray = [];
    const operandArray = [];
    let operand = '';
    let isNegative = false;

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (!isNaN(char) || char === '.') {
            operand += char;
        } else if (operators.includes(char)) {
            if (operand !== '') {
                operandArray.push(parseFloat(operand) * (isNegative ? -1 : 1));
                operand = '';
                isNegative = false;
            }

            while (
                operatorArray.length > 0 &&
                operators.indexOf(operatorArray[operatorArray.length - 1]) >= operators.indexOf(char)
                ) {
                const operator = operatorArray.pop();
                const operand2 = operandArray.pop();
                const operand1 = operandArray.pop();
                const result = applyOperator(operand1, operand2, operator);
                operandArray.push(result);
            }

            operatorArray.push(char);
        } else if (char === '+/-' && operand === '') {
            isNegative = !isNegative;
        }
    }

    if (operand !== '') {
        operandArray.push(parseFloat(operand) * (isNegative ? -1 : 1));
    }

    while (operatorArray.length > 0) {
        const operator = operatorArray.pop();
        const operand2 = operandArray.pop();
        const operand1 = operandArray.pop();
        const result = applyOperator(operand1, operand2, operator);
        operandArray.push(result);
    }

    if (operandArray.length === 1) {
        return operandArray[0];
    }
    throw 'Ошибка: некорректное выражение';
}

