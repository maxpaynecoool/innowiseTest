import './scss/index.scss';
import {evaluateExpression} from './functions';

const expressionInput = document.getElementById('expression');
const theme = document.getElementById('theme-button');

theme.addEventListener('click', () => {
  const operands = document.querySelectorAll('.defaultTheme');
  const extraOperators = document.querySelectorAll('.defaultThemeExtra');
  const expressions = document.querySelectorAll('.defaultThemeExpression');
  document.querySelector('.input-field').classList.toggle('lightThemeInput');
  document.querySelector('.themeIcon').classList.toggle('rotate');

  for (const o of operands) {
    o.classList.toggle('lightTheme');
  }

  for (const e of extraOperators) {
    e.classList.toggle('lightThemeExtra');
  }

  for (const ex of expressions) {
    ex.classList.toggle('lightThemeExpression');
  }
});

const buttons = document.getElementById('buttons');

const appendToExpression = (event) => {
  const value = event.target.textContent.trim();
  if (event.target.tagName !== 'DIV') {
    if (value !== '=' && value !== 'AC' && value !== '+/-') {
      return (expressionInput.value += value);
    }
  }
};

buttons.addEventListener('click', appendToExpression);

// ................................................................

const clear = document.getElementById('clear');

const clearExpression = () => {
  expressionInput.value = '';
};

clear.addEventListener('click', clearExpression);

// ................................................................

const result = document.getElementById('result');

const calculate = () => {
  const expression = expressionInput.value;
  let result;
  try {
    result = evaluateExpression(expression);
    expressionInput.value = result;
  } catch (error) {
    expressionInput.value = 'Ошибка: некорректное выражение';
  }
};

result.addEventListener('click', calculate);

// ................................................................

const changeOperandSign = document.getElementById('change');

const changeSign = () => {
  const expression = expressionInput.value;
  if (expression.charAt(0) === '-') {
    expressionInput.value = expression.slice(1);
  } else {
    expressionInput.value = +`-${expression}`;
  }
};

changeOperandSign.addEventListener('click', changeSign);
