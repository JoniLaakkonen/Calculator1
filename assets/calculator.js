let displayValue = "0"; //variable to keep p with display
let stNumber = null; // variable to keep up with numbers given
let ndNumber = null; // second variable to help keep up with numbers given
let stOperator = null;
let ndOperator = null; // second variable to help keep up with numbers operators
let result = null;
const buttons = document.querySelectorAll("button");

// Funvtion to calculate with 2 numeric values and an operator given
function operate(operator, stvalue, ndvalue) {
  let x = stvalue;
  let y = ndvalue;
  if (operator === "*") {
    return x * y;
  } else if (operator === "/") {
    if (x === 0 || y === 0 || x === '0' || y === '0') {
       alert("Please don't divide by zero.");
       return 0;
    }
    return x / y;
  } else if (operator === "+") {
    return x + y;
  } else if (operator === "-") {
    return x - y;
  }
}
//Function to round to clear things up
function roundResult(num) {
    return parseFloat(Math.round(num + "e+5")  + "e-5");
}

//FUNTIONS TO HANDLE NUMBER AND OPERATOR BUTTONS CLICKED------------------------------------------

//handle numbers inputs
function numberClicked(nmb) {
  if (stOperator === null) {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = nmb;
    } else if (displayValue === stNumber) {
      displayValue = nmb;
    } else {
      displayValue += nmb;
    }
  } else {
    if (displayValue === stNumber) {
      displayValue = nmb;
    } else {
      displayValue += nmb;
    }
  }
}
//function for operator inputs
function operatorClicked(operator) {
  //Check for operator variables
  if ((operator === "-" && displayValue === "0") || displayValue === 0) {
    displayValue = operator;
  } else {
    if (stOperator != null && ndOperator === null) {
      ndOperator = operator;
      ndNumber = displayValue;
      //calculate given two numbers with first operator and give them to stNumber and so ndNumber gets free
      result = operate(stOperator, Number(stNumber), Number(ndNumber));
      displayValue = roundResult(result);//display result
      stNumber = displayValue;
      result = null;//reset result
    } else if (stOperator != null && ndOperator != null) {
      ndNumber = displayValue;
      //calculate given two numbers with second operator and give them to stNumber and so ndNumber gets free
      // and to give ndOperator space for another operator
      result = operate(ndOperator, Number(stNumber), Number(ndNumber));
      ndOperator = operator;
      displayValue = roundResult(result);//display result
      stNumber = displayValue;
      result = null;//reset result
    }
    //IF NONE ABOVE => stOperator is not used and so operand can be given to it and is used in if statement above.
    else {
      stOperator = operator;
      stNumber = displayValue;
    }
  }
}
//function to get calculated summ
function equalsClicked() {
  //hitting equals doesn't display undefined before operate()
    if (stOperator === null || ndOperator != null && ndNumber === null) {
        displayValue = displayValue;
    } else if (ndOperator != null) {
        //handles final result
        ndNumber = displayValue;
        result = operate(stOperator, Number(stNumber), Number(ndNumber));
        displayValue = roundResult(result);
        stNumber = displayValue;
        ndNumber = null;
        stOperator = null;
        ndOperator = null;
        result = null;
    }else {
        //handles first operation
        ndNumber = displayValue;
        result = operate(stOperator, Number(stNumber), Number(ndNumber));
        displayValue = roundResult(result);
        stNumber = displayValue;
        ndNumber = null;
        stOperator = null;
        ndOperator = null;
        result = null;
  }
}

// FUNKTIONS THAT AFFECT MORE DIRECTLY TO DISPLAYVALUE------------------------------------------

//function to clear last input from display
function backspaceClicked() {
  if (displayValue === "0" || displayValue === 0 || displayValue.length <= 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.toString().slice(0, -1);
  }
}
//function to divide display value with 100
function percentClicked(dv) {
  displayValue = (dv / 100).toString();
}
//function to add a dot ('.') to make value a decimal
function dotClicked() {
  //first to check if display is = 0 then adding dot after that 0
  if (displayValue === 0 || displayValue === "0") {
    displayValue = "0";
    displayValue = displayValue + ".";
    //else if display value does not already include a dot, then..
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
//Function to clear display and set everyting back to initial values --> AC button uses this
function clearAllClicked() {
  displayValue = "0";
  stNumber = null;
  ndNumber = null;
  stOperator = null;
  ndOperator = null;
  result = null;
}

//FUNCTIONS TO UPDATE DISPLAY AND TO ADD FUNTIONALITY TO BUTTONS THEMSELVES------------------------------------------

//Update display to keep display updated with 'displayValue'
const updateDisplay = () => {
  const myDisplay = document.querySelector(".display");
  myDisplay.innerText = displayValue;
  //to hid overfow, but to show as many of first numbers, I will use substring to show 10 of first number
  if (displayValue.length > 10) {
    myDisplay.innerText = displayValue.substring(0, 10);
  }
};
// updateDisplay() to keep display updated with 'displayValue'
updateDisplay();

const addClickedBtn = () => {
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("number")) {
        numberClicked(btn.value);
        updateDisplay();
      } else if (btn.classList.contains("operator")) {
        operatorClicked(btn.value);
        updateDisplay();
      } else if (btn.classList.contains("clearAll")) {
        clearAllClicked();
        updateDisplay();
      } else if (btn.classList.contains("backspace")) {
        backspaceClicked();
        updateDisplay();
      } else if (btn.classList.contains("percent")) {
        percentClicked(displayValue);
        updateDisplay();
      } else if (btn.classList.contains("dot")) {
        dotClicked();
        updateDisplay();
      } else if (btn.classList.contains("equals")) {
        equalsClicked();
        updateDisplay();
      }
    });
  });
};
addClickedBtn();



//KEYBOARD LISTENER-----------------------------------
document.addEventListener("keydown", (event) => {
  const keyPressed = document.querySelector(`button[value="${event.key}"]`);
  if(!keyPressed) return;//Secure keyPressed for errors coming from inputs that are now valid
  keyPressed.click();
});
