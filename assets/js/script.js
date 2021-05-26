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

    runGame("addition");
});

function runGame(gameType) {
    // Generate two random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition"){
        displayAdditionQuestion(num1, num2);
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
    } else {
        alert(` Awww...you answered ${userAnswer}, but the correct answer was ${calculatedAnswer[0]}!`)
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
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
    
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}