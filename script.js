// Basic operations functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0 || a === 0) {
    return 0;
  } else {
    return a / b;
  }
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

// Linking JS with HTML

document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector(".equals");
  const clearButton = document.querySelector(".clear");

  let firstOperand = "";
  let secondOperand = "";
  let currentOperation = null;

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendNumber(button.value);
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setOperation(button.value);
    });
  });

  equalsButton.addEventListener("click", () => {
    if (
      currentOperation != null &&
      firstOperand !== "" &&
      secondOperand !== ""
    ) {
      calculate();
    }
  });

  clearButton.addEventListener("click", clear);

  // Main functions

  function appendNumber(number) {
    if (
      display.textContent === "0" ||
      (currentOperation === null && secondOperand === "")
    ) {
      display.textContent = number;
    } else {
      display.textContent += number;
    }

    if (currentOperation === null) {
      firstOperand += number;
    } else {
      secondOperand += number;
    }
  }

  function setOperation(operator) {
    if (currentOperation !== null) calculate();
    firstOperand = display.textContent;
    currentOperation = operator;
  }

  function calculate() {
    secondOperand = display.textContent;
    display.textContent = operate(
      currentOperation,
      firstOperand,
      secondOperand
    );
    firstOperand = display.textContent;
    secondOperand = "";
    currentOperation = null;
  }

  function clear() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
  }
});
