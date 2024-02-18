let startWrapper = document.querySelector(".start-wrapper");
let quizWrapper = document.querySelector(".quiz-wrapper");
let startButton = document.querySelector(".start-button");
let quizHeading = document.querySelector(".question-heading");
let answerButtons = document.querySelectorAll(".answer-row>button");
let resultHeading = document.querySelector(".result-heading");
let signs = ["-", "+"];
let buttonRightIndex = 0;
let rightCounter = 0;
let wrongCounter = 0;
let amountCounter = 0;

function startGame() {
    startWrapper.classList.add("hide");
    quizWrapper.classList.remove("hide");
    setTimeout(showResult, 10000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateQuestion() {
    let num1 = getRandomInt(50);
    let num2 = getRandomInt(50);
    let sign = signs[getRandomInt(signs.length)];
    let result = 0;
    quizHeading.innerHTML = `${num1} ${sign} ${num2}`;

    buttonRightIndex = getRandomInt(answerButtons.length);

    if (sign === "-") {
        result = num1 - num2;
    } else {
        result = num1 + num2;
    }


    for (let i = 0; i < answerButtons.length; i += 1) {
        if (i === buttonRightIndex) {
            answerButtons[i].innerHTML = result;
            answerButtons[i].classList.add("right");
        } else {
            answerButtons[i].innerHTML = getRandomInt(50);
            answerButtons[i].classList.add("wrong");
        }
    }   
}

function removeClasses() {
    for (let i = 0; i < answerButtons.length; i += 1) {
        if (answerButtons[i].classList.contains("right")) {
            answerButtons[i].classList.remove("right");
        }

        if (answerButtons[i].classList.contains("wrong")) {
            answerButtons[i].classList.remove("wrong");
        }
    }
}

function checkAnswer(item) {
    return function () {
        if (answerButtons[item].classList.contains("right")) {
            rightCounter += 1;
        } else {
            wrongCounter += 1;
        }
        amountCounter += 1;
    }
}

function endGame() {
    startWrapper.classList.remove("hide");
    quizWrapper.classList.add("hide");
    resultHeading.classList.remove("hide");
    resultHeading.innerHTML = `total: ${amountCounter}, right: ${rightCounter}, wrong: ${wrongCounter}`
}

startButton.addEventListener("click", startGame);

generateQuestion();

for (let i = 0; i < answerButtons.length; i += 1) {
    answerButtons[i].addEventListener("click", generateQuestion);
    answerButtons[i].addEventListener("mouseup", removeClasses);
    answerButtons[i].addEventListener("click", checkAnswer(i));
}

function showResult() {
    resultHeading.innerHTML = `total: ${amountCounter}, right: ${rightCounter}, wrong: ${wrongCounter}`
    resultHeading.classList.remove("hide");
    startWrapper.classList.remove("hide");
    quizWrapper.classList.add("hide");
}

