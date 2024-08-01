const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "a) Shark", correct: false },
      { text: "b) Blue whale", correct: true },
      { text: "c) Elephant", correct: false },
      { text: "d) Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest counry in the world?",
    answers: [
      { text: "a) Vatican City", correct: true },
      { text: "b) Bhutan", correct: false },
      { text: "c) Nepal", correct: false },
      { text: "d) Shri Lanka", correct: false },
    ],
  },
  {
    question: "How many bones in human body?",
    answers: [
      { text: "a) 206", correct: true },
      { text: "b) 202", correct: false },
      { text: "c) 208", correct: false },
      { text: "d) 205", correct: false },
    ],
  },
  {
    question: "Which is largest desert in the world?",
    answers: [
      { text: "a) kalahari", correct: false },
      { text: "b) Gobi", correct: false },
      { text: "c) Sahara", correct: false },
      { text: "d) Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "a) Asia", correct: false },
      { text: "b) Australia", correct: true },
      { text: "c) Arctic", correct: false },
      { text: "d) Africa", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// remove html or previous content
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  answerButton.style.display = "none";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    answerButton.style.display = "block";
    startQuiz();
  }
});
startQuiz();
