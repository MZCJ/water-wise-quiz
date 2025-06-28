// 20 water protection questions
const questionBank = [
  { question: "Which practice helps reduce water waste?", answers: ["Turn off the tap while brushing","Leave the tap running","Take extra hot showers","Water plants at midday"], correct: 0 },
  { question: "What household device can save water?", answers: ["Low-flow showerhead","Standard faucet","Open irrigation","Powerful hose"], correct: 0 },
  { question: "What should you do when brushing your teeth?", answers: ["Turn off the tap","Leave water running","Use boiling water","Brush without water"], correct: 0 },
  { question: "Which activity wastes the most water?", answers: ["Taking very long showers","Using a full dishwasher","Collecting rainwater","Fixing leaks quickly"], correct: 0 },
  { question: "How can you water plants efficiently?", answers: ["Use drip irrigation","Spray water with a hose","Flood the garden","Water at noon"], correct: 0 },
  { question: "Why avoid dumping chemicals down the drain?", answers: ["It pollutes water sources","It cleans pipes faster","It saves time","It keeps drains open"], correct: 0 },
  { question: "What is rainwater harvesting?", answers: ["Collecting and storing rainwater","Wasting rainwater","Selling rainwater","None of the above"], correct: 0 },
  { question: "Which is a non-point source of water pollution?", answers: ["Agricultural runoff","Factory discharge pipe","Sewage treatment plant","Oil tanker spill"], correct: 0 },
  { question: "What is one benefit of planting trees near rivers?", answers: ["Reduces soil erosion","Raises water temperature","Blocks sunlight","Increases algae growth"], correct: 0 },
  { question: "Which is a primary cause of water scarcity?", answers: ["Overuse of groundwater","Recycling water","Collecting rainwater","Using low-flow fixtures"], correct: 0 },
  { question: "What is a simple way to check for leaks?", answers: ["Watch the meter when no water is used","Listen for running water","Use more water","Ignore small drips"], correct: 0 },
  { question: "How often should you fix a dripping faucet?", answers: ["As soon as possible","Once a year","When you remember","Never"], correct: 0 },
  { question: "What device can reduce toilet flush volume?", answers: ["Dual-flush toilet","Regular toilet","Power flush","None"], correct: 0 },
  { question: "Which action helps protect water in natural habitats?", answers: ["Not dumping trash","Riding ATVs","Using motorboats","Feeding wildlife"], correct: 0 },
  { question: "How do wetlands help water protection?", answers: ["Filter pollutants","Raise water levels","Increase flooding","Dry the land"], correct: 0 },
  { question: "What is wastewater treatment?", answers: ["Cleaning used water before release","Drinking dirty water","Dumping chemicals","None of the above"], correct: 0 },
  { question: "Which packaging reduces water harm?", answers: ["Biodegradable packaging","Plastic wrap","Foil packaging","Glass bottles"], correct: 0 },
  { question: "Why conserve water in agriculture?", answers: ["To avoid resource depletion","To increase pests","To waste resources","To pollute soil"], correct: 0 },
  { question: "What is gray water reuse?", answers: ["Reusing sink and shower water for irrigation","Drinking wastewater","Collecting rainwater","Discarding all used water"], correct: 0 },
  { question: "How can governments help protect water?", answers: ["Enforce pollution laws","Encourage dumping","Close treatment plants","Raise water wastage"], correct: 0 }
];

// Elements
const diffButtons = document.querySelectorAll(".diff-btn");
const diffSel = document.getElementById("difficulty-selection");
const qContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answer-buttons");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const bgMusic = document.getElementById("bg-music");
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const soundWin = document.getElementById("sound-win");

let questions = [], currentQuestion = 0, score = 0, correctCount = 0, winThreshold = 0;
const milestones = [20, 50, 80];

// Play background music with user interaction fallback
window.addEventListener("load", () => {
  bgMusic.volume = 0.2;
  const playPromise = bgMusic.play();
  if (playPromise && playPromise.catch) {
    document.body.addEventListener("click", () => bgMusic.play(), { once: true });
  }
});

// Difficulty selection
diffButtons.forEach(btn => btn.addEventListener("click", () => {
  winThreshold = parseInt(btn.dataset.threshold);
  startGame();
}));

function startGame() {
  diffSel.classList.add("hidden");
  qContainer.classList.remove("hidden");
  score = 0; correctCount = 0;
  scoreEl.textContent = score;
  questions = shuffle(questionBank).slice(0, 10);
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  answersEl.innerHTML = "";
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => selectAnswer(i));
    answersEl.appendChild(btn);
  });
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

function selectAnswer(i) {
  const q = questions[currentQuestion];
  const correct = i === q.correct;
  if (correct) {
    score += 10; correctCount++;
    feedbackEl.textContent = "Correct! 🎉"; soundCorrect.play();
  } else {
    score -= 5;
    feedbackEl.textContent = "Wrong! 💧"; soundWrong.play();
  }
  scoreEl.textContent = score;
  if (milestones.includes(score)) alert(`Milestone reached: ${score} points!`);
  if (correctCount >= winThreshold) {
    feedbackEl.textContent = `You Win! Final Score: ${score}`; soundWin.play();
    bgMusic.pause(); bgMusic.currentTime = 0;
    disableAnswers(); nextBtn.style.display = "none";
    return;
  }
  disableAnswers(); nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else feedbackEl.textContent = `Quiz Complete! Final Score: ${score}`;
});

resetBtn.addEventListener("click", () => {
  diffSel.classList.remove("hidden"); qContainer.classList.add("hidden");
  bgMusic.currentTime = 0; bgMusic.play();
});

function disableAnswers() {
  Array.from(answersEl.children).forEach(b => b.disabled = true);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Initial state
qContainer.classList.add("hidden");
