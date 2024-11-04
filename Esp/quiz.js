// Quiz questions
const questions = [
  {
    type: "essay",
    text: "Sino si Andoy?",
  },
  {
    type: "essay",
    text: "Anong tulong ang ginawa ni Andoy kay Lolo Isko?",
  },
  {
    type: "essay",
    text: "Ano ang sinabi ni Lolo Isko tungkol sa kaligayahan?",
  },
  {
    type: "essay",
    text: "Paano nagbago si Andoy pagkatapos ng kanyang karanasan kay Lolo Isko?",
  },
  {
    type: "essay",
    text: "Ano ang mensahe ng panaginip ni Andoy?",
  },
  {
    type: "essay",
    text: "Ano ang simbolo ni Andoy sa baryo ng San Martin?",
  },
  {
    type: "essay",
    text: "Sino sina Angela at Becca?",
  },
  {
    type: "essay",
    text: "Ano ang nararamdaman ni Becca habang unti-unting nakakamit ni Angela ang kanyang mga pangarap?",
  },
  {
    type: "essay",
    text: "Anong pagkakataon ang nagbigay-diin sa inggit ni Becca?",
  },
  {
    type: "essay",
    text: "Bakit hindi nagka-partner sina Angela at Becca sa kompetisyon?",
  },
  {
    type: "essay",
    text: "Ano ang sinabi ni Angela kay Becca habang tumatanggap siya ng parangal?",
  },
  {
    type: "essay",
    text: "Ano ang natutunan ni Becca sa kanilang karanasan?",
  },
  {
    type: "essay",
    text: "Sino si Carlo at ano ang kanyang pangarap?",
  },
  {
    type: "essay",
    text: "Bakit nagdalawang-isip si Carlo sa alok ni Tony?",
  },
  {
    type: "essay",
    text: "Ano ang naging resulta ng pagpili ni Carlo na sumama kay Tony?",
  },
  {
    type: "essay",
    text: "Anong nangyari kay Carlo sa kulungan?",
  },
  {
    type: "essay",
    text: "Ano ang natutunan ni Carlo mula sa kanyang karanasan?",
  },
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 10; // seconds per question
let score = 0; // Track the number of correct answers
let essayAnswers = []; // Store essay answers

// Function to start the timer
function startTimer() {
  timeLeft = 20;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // Automatically move to the next question
    }
  }, 1000);
}

// Function to display a question
function displayQuestion() {
  clearInterval(timer); // Stop any existing timer
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const essayContainer = document.getElementById("essayContainer");
  const question = questions[currentQuestionIndex];

  // Reset visibility and content for the new question
  questionElement.textContent = question.text;
  choicesElement.innerHTML = "";
  essayContainer.style.display = "none";
  document.getElementById("essayAnswer").value = "";

  if (question.type === "multiple-choice") {
    // Display choices for multiple-choice questions
    question.choices.forEach((choice) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      button.onclick = () => selectAnswer(choice);
      li.appendChild(button);
      choicesElement.appendChild(li);
    });
    startTimer(); // Start a new timer for multiple-choice questions
  } else if (question.type === "essay") {
    // Display essay input for essay questions
    essayContainer.style.display = "block";
    document.getElementById("nextButton").style.display = "none";
  }
}

// Function to handle answer selection
function selectAnswer(selectedChoice) {
  const question = questions[currentQuestionIndex];
  if (selectedChoice === question.correct) {
    score++; // Increase score for correct answer
  }
  nextQuestion();
}

// Function to submit the essay answer
function submitEssay() {
  const essayAnswer = document.getElementById("essayAnswer").value;
  if (essayAnswer.trim() === "") {
    alert("Please write an answer before submitting.");
    return;
  }
  essayAnswers.push({
    question: questions[currentQuestionIndex].text,
    answer: essayAnswer,
  });
  nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
  clearInterval(timer); // Stop the timer
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // Show the "Complete Quiz" button at the end
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("completeButton").style.display = "inline";
    document.getElementById("timer").style.display = "none"; // Hide the timer
  }
}

// Function to complete the quiz and show the score and essay answers
function completeQuiz() {
  document.getElementById("question").style.display = "none";
  document.getElementById("choices").style.display = "none";
  document.getElementById("essayContainer").style.display = "none";
  document.getElementById("completeButton").style.display = "none";

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";

  // Start building the result content with score
  let resultText = `<strong>Esp</strong><br><strong>Quiz Completed!</strong><br>Your score: ${score} out of ${
    questions.filter((q) => q.type === "multiple-choice").length
  }<br><br>`;

  // Show essay answers with formatting
  resultText += "<strong>Essay Answers:</strong><br>";
  essayAnswers.forEach((answer, index) => {
    resultText += `${index + 1}. <strong>${
      answer.question
    }</strong><br>Your Answer: ${answer.answer}<br><br>`;
  });

  resultElement.innerHTML = resultText + `<a href="../index.html">Bumalik</a>`; // Use innerHTML to render HTML elements
}

// Initialize the quiz
displayQuestion();
