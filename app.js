// Available operators for mathematical operations
let operators = ["+", "-", "*"];

// Getting elements from HTML
const startBtn = document.getElementById("math-game-start-game-btn");
const question = document.getElementById("math-game-questions");
const controls = document.querySelector(".math-game-controls-container");
const result = document.getElementById("math-game-result");
const submitBtn = document.getElementById("math-game-submit-btn");
const errorMessage = document.getElementById("math-game-error-msg");

// Variables to store the current question's answer and operator
let answerValue;
let operatorQuestion;

// Function to generate random values
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Function to generate a math question
const questionGenerator = () => {
  // Generating two random numbers between 1 and 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

  // Choosing a random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  // If the operator is subtraction and the second number is greater than the first,
  // swap the numbers to avoid negative results
  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Calculating the solution of the equation
  let solution = eval(`${num1}${randomOperator}${num2}`);

  // Choosing a random position to place the input field
  let randomVar = randomValue(1, 5);

  // Generating the question based on the position of the input field
  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="math-game-input-value" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="math-game-input-value" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="math-game-input-value" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="math-game-input-value" placeholder="?"\>`;
  }

  // Checking user input when the submit button is clicked
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("math-game-input-value").value;
    // If user input is not empty
    if (userInput) {
      // If the user guessed the correct answer
      if (userInput == answerValue) {
        stopGame(`Wow!! <span>Correct</span> Answer`);
      }
      // If user inputs an operator other than +, -, *
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Please enter a valid operator";
      }
      // If the user guessed the wrong answer
      else {
        stopGame(`Oops!! <span>Wrong</span> Answer`);
      }
    }
    // If user input is empty
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Input Cannot Be Empty";
    }
  });
};

// Starting the game when the start button is clicked
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  // Hiding controls and buttons
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  // Generating the first question
  questionGenerator();
});

// Stopping the game and showing the result
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Restart";
  // Showing controls and start button
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};
