import "./scss/index.scss"
import { evaluateExpression } from '@/functions.js';

const buttons = document.getElementById('buttons')

buttons.addEventListener('click', appendToExpression)

function appendToExpression(event) {
    const value = event.target.textContent.trim()
    if (value !== '=' && value !== 'AC' && value !== '+/-') {
        const expressionInput = document.getElementById("expression")
        return expressionInput.value += value
    }
}

//................................................................

const clear = document.getElementById('clear')

clear.addEventListener('click', clearExpression)

function clearExpression() {
    const expressionInput = document.getElementById("expression")
    expressionInput.value = ""
}

//................................................................

const result = document.getElementById('result')

result.addEventListener('click', calculate)

function calculate() {
    const expressionInput = document.getElementById("expression")
    const expression = expressionInput.value
    let result

    try {
        result = evaluateExpression(expression)
        expressionInput.value = result
    } catch (error) {
        expressionInput.value = "Ошибка: некорректное выражение"
    }
}

//................................................................

const changeOperandSign = document.getElementById('change')

changeOperandSign.addEventListener('click', changeSign)

function changeSign() {
    const expressionInput = document.getElementById("expression")
    const expression = expressionInput.value

    if (expression.charAt(0) === "-") {
        expressionInput.value = expression.slice(1)
    } else {
        expressionInput.value = `-${expression}`
    }
}


