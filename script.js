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
  document.addEventListener("keydown", handleKeyPress);
  const display = document.querySelector(".display");
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const clearButton = document.querySelector(".clear");
  const equalsButton = document.querySelector(".equals");
  const backspaceButton = document.querySelector(".backspace");

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
  equalsButton.addEventListener("click", () => {
    equalsButton.classList.add("fire-effect");
    evaluate();
    setTimeout(() => equalsButton.classList.remove("fire-effect"), 200);
  });
  backspaceButton.addEventListener("click", backspace);

  function handleKeyPress(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendNumber(e.key);
    if (e.key === "Backspace") backspace();
    if (e.key === "Enter" || e.key === "=") evaluate();
    if (["+", "-", "*", "/"].includes(e.key)) setOperation(e.key);
    if (e.key === "Escape") clear();
  }

  function appendNumber(number) {
    if (display.textContent === "0" || shouldResetScreen) resetScreen();
    if (number === "." && display.textContent.includes(".")) return;
    display.textContent += number;
  }

  function backspace() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") display.textContent = "0";
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
      clear();
      return;
    }
    secondOperand = display.textContent;
    let result = operate(currentOperation, firstOperand, secondOperand);
    if (result.toString().includes(".")) {
      result = result.toFixed(2);
    }
    display.textContent = result;
    firstOperand = display.textContent;
    currentOperation = null;
    shouldResetScreen = true;
  }
});
