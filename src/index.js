import './scss/index.scss';

// .........Theme switcher............
const theme = document.getElementById('theme-button');
const operands = document.querySelectorAll('.defaultTheme');
const extraOperators = document.querySelectorAll('.defaultThemeExtra');
const expressions = document.querySelectorAll('.defaultThemeExpression');

theme.addEventListener('click', () => {
  document.querySelector('.input-field').classList.toggle('lightThemeInput');
  document.querySelector('.themeIcon').classList.toggle('rotate');

  operands.forEach((operand) => {
    operand.classList.toggle('lightTheme');

  })

  extraOperators.forEach((operator) => {
    operator.classList.toggle('lightThemeExtra');
  })

  expressions.forEach((expression) => {
    expression.classList.toggle('lightThemeExpression');
  })
})

// .........Commands............

const commands = {
  add: function (x, y) {
    return x + y;
  },
  subtract: function (x, y) {
    return x - y;
  },
  multiply: function (x, y) {
    return x * y;
  },
  divide: function (x, y) {
    return y === 0 ? display.value = 'Division by 0' : x / y;
  },
  percent: function (x, y) {
    return x * (y / 100);
  },
  square: function (x) {
    return x * x;
  },
  cube: function (x) {
    return x * x * x;
  },
  sqrt: function (x) {
    return sqrt(x, 0.00001);
  },
  cbrt: function (x) {
    return cbrt(x, 0.00001);
  },
  factorial: function (x) {
    return factorial(x);
  },
  pow: function (x, y) {
    return pow(x, y);
  },
  root: function (x, y) {
    return root(x, 0.00001, y);
  },
  tenPow: function (y) {
    return pow(10, y);
  },
  reciprocal: function (x) {
    return 1 / x;
  },
};

function sqrt(x, precision) {
  let guess = x;
  while (Math.abs(guess * guess - x) > precision) {
    guess = (guess + x / guess) / 2;
  }
  return guess.toFixed(5);
}

function cbrt(x, precision) {
  let guess = x;
  while (Math.abs(guess * guess * guess - x) > precision) {
    guess = (2 * guess + x / (guess * guess)) / 3;
  }
  return guess.toFixed(5);
}

function root(x, precision, y) {
  let guess = x;
  while (Math.abs(guess * guess - x) > precision) {
    guess = (guess + x / guess) / y;
  }
  return guess.toFixed(5);
}

function factorial(x) {
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
}

function pow(x, y) {
  let result = 1;
  for (let i = 0; i < y; i++) {
    result *= x;
  }
  return result;
}

function Calculator() {
  this.history = [];
  this.execute = function (name, x, y) {
    let command = commands[name];
    if (!command) throw new Error('Неизвестная команда');
    let result = command(x, y);
    this.history.push({name, x, y, result});
    return result;
  };
  let memory = 0;
  this.memoryClear = function() {
    memory = 0;
  };
  this.memoryAdd = function(value) {
    memory += value;
  };
  this.memorySubtract = function(value) {
    memory -= value;
  };
  this.memoryRecall = function() {
    return memory;
  };
}

let calculator = new Calculator();
let display = document.getElementById('display');
let mrButton = document.getElementById('mrButton');
let operand1 = '';
let operand2 = '';
let operator = null;
let newNumber = false;

function appendNumber(number) {
  if (newNumber) {
    operand1 = number.toString();
    newNumber = false;
  } else {
      operand1 += number;
  }
  display.value = operand1;
  removeHighlight();
}

function appendDecimalPoint() {
  if (!operand1.includes('.')) {
    operand1 += '.';
    display.value = operand1;
  }
}

function executeCommand(name) {
  if (operator) {
    calculate();
  }
  if (
    name === 'sqrt' ||
    name === 'cbrt' ||
    name === 'factorial' ||
    name === 'square' ||
    name === 'cube' ||
    name === 'tenPow' ||
    name === 'reciprocal'
  ) {
    let result = calculator.execute(name, parseFloat(operand1));
    display.value = result;
    operand1 = result;
    operand2 = '';
    operator = null;
    newNumber = true;
  } else {
    operator = name;
    operand2 = operand1;
    newNumber = true;
    highlightOperator(name);
  }
}

function calculate() {
  if (operator !== null) {
    let result = calculator.execute(
      operator,
      parseFloat(operand2),
      parseFloat(operand1),
    );
    display.value = result;
    operand1 = result.toString();
    operand2 = '';
    operator = null;
    newNumber = true;
  }
  removeHighlight();
}

function clearDisplay() {
  operand1 = '';
  operand2 = '';
  operator = null;
  display.value = '';
  newNumber = false;
  removeHighlight();
}

function highlightOperator(name) {
  removeHighlight();
  let button = document.getElementById(name);
  if (button) {
    button.classList.add('selected');
  }
}

function removeHighlight() {
  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected');
  }
}

function changeSign() {
  if (operand1) {
    operand1 = (-parseFloat(operand1)).toString();
    display.value = operand1;
  }
}

function memoryClear() {
  calculator.memoryClear();
  mrButton.classList.remove('memory-stored');
}

function memoryAdd() {
  calculator.memoryAdd(parseFloat(operand1));
  mrButton.classList.add('memory-stored');
}

function memorySubtract() {
  calculator.memorySubtract(+parseFloat(operand1));
  mrButton.classList.add('memory-stored');
}

function memoryRecall() {
  operand1 = calculator.memoryRecall();
  display.value = operand1;
}

// .........Events............

document.querySelectorAll('button[data-number]').forEach((button) => {
  button.addEventListener('click', function () {
    appendNumber(this.dataset.number);
  });
});

document.querySelectorAll('button[data-command]').forEach((button) => {
  button.addEventListener('click', function () {
    executeCommand(this.dataset.command);
  });
});

document.getElementById('decimal-point').addEventListener('click', appendDecimalPoint);
document.getElementById('calculate').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearDisplay);

mrButton.addEventListener('click', memoryRecall);
document.getElementById('memoryClear').addEventListener('click', memoryClear);
document.getElementById('memoryAdd').addEventListener('click', memoryAdd);
document.getElementById('memorySubtract').addEventListener('click', memorySubtract);

document.getElementById('changeSign').addEventListener('click', changeSign);