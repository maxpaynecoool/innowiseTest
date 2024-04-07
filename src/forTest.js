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
    return root(x, 0.0001, y);
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
  this.execute = function (name, x, y) {
    let command = commands[name];
    if (!command) throw new Error('Неизвестная команда');
    return command(x, y);
  };
}

module.exports = {Calculator};