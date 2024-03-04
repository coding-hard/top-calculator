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

document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const clearButton = document.querySelector(".clear");
  const equalsButton = document.querySelector(".equals");

  let firstOperand = "";
  let secondOperand = "";
  let currentOperation = null;
  let shouldResetScreen = false;

  numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.value))
  );

  operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.value))
  );

  clearButton.addEventListener("click", clear);
  equalsButton.addEventListener("click", evaluate);

  function appendNumber(number) {
    if (display.textContent === "0" || shouldResetScreen) resetScreen();
    display.textContent += number;
  }

  function resetScreen() {
    display.textContent = "";
    shouldResetScreen = false;
  }

  function clear() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
  }

  function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = display.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
  }

  function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "/" && display.textContent === "0") {
      display.textContent = "Error";
      alert("You can't divide by 0!");
      return;
    }
    secondOperand = display.textContent;
    display.textContent = operate(
      currentOperation,
      firstOperand,
      secondOperand
    );
    currentOperation = null;
  }
});
