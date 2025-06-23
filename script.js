const questions = [
  {
    question: "How many people lack access to clean water?",
    answers: ["1 million", "771 million", "5 billion", "100 million"],
    correct: 1
  },
  {
    question: "What color is charity: water’s iconic jerry can?",
    answers: ["Blue", "Red", "Yellow", "Green"],
    correct: 2
  },
  {
    question: "Where does most water collection work fall to?",
    answers: ["Men", "Women and children", "Governments", "Animals"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answer-buttons");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const confetti = document.getElementById("confetti");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

function checkAnswer(index) {
  const isCorrect = index === questions[currentQuestion].correct;
  if (isCorrect) {
    score += 10;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  } else {
    score -= 5;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  }
  scoreEl.textContent = score;
  nextBtn.style.display = "inline";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    questionEl.textContent = "You finished the quiz!";
    answersEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score}`;
    if (score >= 20) showConfetti();
    nextBtn.style.display = "none";
  } else {
    showQuestion();
  }
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = score;
  hideConfetti();
  showQuestion();
}

function showConfetti() {
  feedbackEl.textContent += " 🎉🎉";
}

function hideConfetti() {}

nextBtn.onclick = nextQuestion;
resetBtn.onclick = resetGame;

showQuestion();