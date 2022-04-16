const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let warningMessage = document.createElement("div");
warningMessage.classList.add('warningMessage');
display.appendChild(warningMessage);
warningMessage.setAttribute('style', 'font-size: 10px; color: white; text-overflow: ellipsis; overflow: hidden; padding: 10px;')
let displayCurrentNumber = document.createElement("div");
displayCurrentNumber.classList.add('displayCurrentNumber');
display.appendChild(displayCurrentNumber);
displayCurrentNumber.setAttribute('style', 'font-size: 60px; color: white; text-overflow: ellipsis; overflow: hidden;')
let displayResult = document.createElement("div");
displayResult.classList.add('displayResult');
display.appendChild(displayResult);
displayResult.setAttribute('style', 'font-size: 60px; color: white;')
let displayOperator = document.createElement("div");
displayOperator.classList.add('displayOperator');
display.appendChild(displayOperator);
displayOperator.setAttribute('style', 'font-size: 30px; margin-right:auto; color: white')

let num = [];
let numIndex = 0;
let result;
let operator;
let currentNum;

displayCurrentNumber.textContent = 0;
startCalculator(num, numIndex);

document.addEventListener('keydown', function(event) {
    if(event.key >= "0" && event.key <= "9") {
        let keyboard = event.key;
        switch(keyboard) {
            case "1":
                keyboard = "6";
                break;
            case "2":
                keyboard = "7";
                break;
            case "3":
                keyboard = "8";
                break;
            case "4":
                keyboard = "3";
                break;
            case "5":
                keyboard = "4";
                break;
            case "6":
                keyboard = "5";
                break;
            case "7":
                keyboard = "0";
                break;
            case "8":
                keyboard = "1";
                break;
            case "9":
                keyboard = "2";
                break;
            case "0":
                keyboard = "9";
                break;
        }
        buttons[keyboard].click();
      }

    if(event.key == ".") {
        buttons["10"].click();
    }
    if(event.key == "Escape") {
        buttons["11"].click();
    }
    if(event.key == "Backspace") {
        buttons["12"].click();
    }
    if(event.key == "+") {
        buttons["13"].click();
    }
    if(event.key == "-") {
        buttons["14"].click();
    }
    if(event.key == "/") {
        buttons["15"].click();
    }
    if(event.key == "*") {
        buttons["16"].click();
    }
    if(event.key == "=") {
        buttons["17"].click();
    }
});


function startCalculator(num, numIndex) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            if (!isNaN(parseInt(buttons[i].value)) || buttons[i].value == "." || buttons[i].value == "del") {
                if (buttons[i].value != "." && displayCurrentNumber.textContent == "0") {
                    displayCurrentNumber.textContent = ""
                }
                if (buttons[i].value == "." && displayCurrentNumber.textContent.includes(".")) {
                    displayCurrentNumber.textContent += "";
                } else if (buttons[i].value != "del") {
                    displayResult.textContent = "";
                    displayOperator.textContent = "";
                    if (buttons[i].value == "." && displayCurrentNumber.textContent == "") {
                        displayCurrentNumber.textContent = "0"
                    }
                    displayCurrentNumber.textContent += buttons[i].value;
                }
                if (buttons[i].value == "del" && displayResult.textContent === "") {
                    if (displayCurrentNumber.textContent.length > 1) {
                        displayCurrentNumber.textContent = displayCurrentNumber.textContent.slice(0,-1)
                    } else {
                        displayCurrentNumber.textContent = "0"
                    }
                }
            } else {
                if (!isNaN(parseInt(displayCurrentNumber.textContent))) {
                    if (operator == "") {
                        numIndex = 0;
                    }
                    num[numIndex] = parseFloat(displayCurrentNumber.textContent);
                    currentNum = num[numIndex];
                }
                if (num.length > 1) {
                    result = operate(operator, num[numIndex-1], num[numIndex]);
                    if (result > 9e7 || result < 9e-3) {
                        console.log(result)
                        result = result.toExponential(2);
                    } else {
                        result = (Math.round(result*1000)/1000);
                    }
                    displayResult.textContent = result;
                    num = [result]
                    numIndex = 1;
                }
                if (buttons[i].value == "=" && buttons[i].value != "AC" && buttons[i].value != "del") {
                    operator = "";
                    if (num > 9e7 && num !=Infinity) {
                        num = [parseFloat(num[0]).toExponential(2)];
                    }
                    displayResult.textContent = num;
                    displayCurrentNumber.textContent = "";
                    displayOperator.textContent = buttons[i].value;
                } else if (buttons[i].value != "AC" && buttons[i].value != "del") {
                    displayOperator.textContent = buttons[i].value;
                    displayCurrentNumber.textContent = "";
                    operator = buttons[i].value;
                    numIndex = 1;
                }
                if (buttons[i].value == "AC") {
                    displayCurrentNumber.textContent = 0;
                    warningMessage.textContent = "";
                    displayOperator.textContent = "";
                    displayResult.textContent = "";
                    numIndex = 0;
                }
            }
        });
    }
}


function add(num1, num2) {
    return num1+num2;
}

function substract(num1, num2) {
    return num1-num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function operate(operator, num1, num2) {
    if (operator == "+") {
        return add(num1, num2);
    }
    if (operator == "-") {
        return substract(num1, num2);
    }
    if (operator == "÷") {
        if (num2 == 0) {
            warningMessage.textContent = "If you paid attention in grade 3 Math, you would know by now that you can't divide by 0. Now that you have learnt your lession, PRESS ESC NOW!!!!"
            return Infinity;
        }
        return divide(num1, num2);
    }
    if (operator == "x") {
        return multiply(num1, num2);
    }
}