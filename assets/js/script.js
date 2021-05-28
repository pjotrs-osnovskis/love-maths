// Wait for the DOM to finish loading before running the Game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") == "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    // Here event listener is listenong for Enter key instead of pressin 
    // submit button all the time.
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter"){
            checkAnswer();
        }
    });

    runGame("addition");
});

function runGame(gameType) {
    // Generate two random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers

    // This line clears "answer-box" after calling this function
    document.getElementById("answer-box").value = "";

    // Here we focus on the "answer-box" so cursor is in the
    // answer box field for convinience after calling runGame function.
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition"){
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2); 
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        // Using alert to alert user that there is an error
        alert(`Unknown game type ${gameType}`);
        // Using throw to log this error in console 
        throw `Unknown game type ${gameType}, aborting!`;
    }

}

function checkAnswer() {
    // Checks the answer against the first element in
    // the returned calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :)")
        incrementScore();
    } else {
        alert(` Awww...you answered ${userAnswer}, but the correct answer was ${calculatedAnswer[0]}!`)
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    // Gets the opernads (numbers) and the operator (+, -, *, /)
    // directly from DOM
    // Using parseInt function to make sure we use ineger instead of default string
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }

}

function incrementScore() {
    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    // Gets the current incorrect score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
    
}

    // A little different approach so first number is bigger than
    // second, do we dont have negative results

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 :
    operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 :
    operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "*";
}