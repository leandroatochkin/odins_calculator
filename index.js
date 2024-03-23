document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {
        const key = event.code;
        const button = document.querySelector(`[data-key="${key}"]`);
        if (button) {
            button.click();
        }
    });
    console.log("Page loaded")
    screenOperations.textContent = "0"
    screenResult.textContent = "0"
    getResult()
    
});


let clearButton = document.querySelector("#clear")
let deleteButton = document.querySelector("#delete")
let screenOperations = document.querySelector("#screen-operations")
let screenResult = document.querySelector("#result")
let numpadButtons = document.querySelectorAll(".numpad-button")
let equalButton = document.querySelector("#equal")


function getResult() {
    let arr = []; 
    numpadButtons.forEach(button => {
    button.addEventListener("click", () => { 
            let value = button.textContent;
            arr.push(value);
            let displayOperation = arr.join('')
            screenOperations.textContent = displayOperation
    });
    });
    deleteButton.addEventListener("click", ()=>{
        arr.pop()
        let displayOperation = arr.join('')
        screenOperations.textContent = displayOperation

    })
    equalButton.addEventListener("click", ()=>{
        let displayOperation = arr.join('')
        screenOperations.textContent = displayOperation
        let result = operate(arr).toString()
        if(result === 'e'){
            screenResult.textContent = "Err"   
        } else {
            screenResult.textContent = result
            if (result.length >= 8) {
                screenResult.style.fontSize = "12px"; 
            } else {
                screenResult.style.fontSize = ""; 
            }
            
        }
        arr = [result]
    })
    clearButton.addEventListener("click", ()=>{
        screenOperations.textContent = "0"
        screenResult.textContent = "0"
        arr = []
    })
    
}

function operate(arr) {
const operatorRegex = /[-+*/]/; // Corrected regex to include *
const numberRegex = /-?\d+(\.\d+)?/; 
let operator = '';
let firstEntry = '';
let secondEntry = '';
let result = 0;

for (let i = 0; i < arr.length; i++) {
    if (numberRegex.test(arr[i])) {
        if (operator === '') {
            firstEntry += arr[i];
        } else {
            secondEntry += arr[i];
        }
    } else if (operatorRegex.test(arr[i])) {
        if (arr[i] === '-' && firstEntry === '') {
            firstEntry += arr[i];
        } else {
            operator = arr[i];
        }
}

}

let firstValue = parseInt(firstEntry);
let secondValue = parseInt(secondEntry);

switch (operator) {
    case "+":
        result = firstValue + secondValue;
        break;
    case "-":
        result = firstValue - secondValue;
        break;
    case "*":
        result = firstValue * secondValue;
        break;
    case "/":
        if (secondValue === 0) {
            console.log("Error: Division by zero");
            return 'e';
        }
        result = firstValue / secondValue;
        break;
}
return result;
}
