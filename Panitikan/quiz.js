// Quiz questions
const questions = [
  {
    type: "essay",
    text: " Ano ang bayan na kilala sa pulang ulan?",
  },
  {
    type: "essay",
    text: "Sino ang dalawang bathala na bumaba sa bayan ng Luntian?",
  },
  {
    type: "essay",
    text: "Ano ang layunin ni Bathalang Puti nang makita ang bayan ng Luntian?",
  },
  {
    type: "essay",
    text: " Ano ang anyo na ginamit ni Bathalang Itim upang subukin ang mga tao?",
  },
  {
    type: "essay",
    text: "Paano tinanggap ng isang pangkaraniwang pamilya si Bathalang Itim?",
  },
  {
    type: "essay",
    text: "Ano ang sinabi ni Danilo kay Bathalang Itim?",
  },
  {
    type: "essay",
    text: "Ano ang naging simbolismo ng pulang ulan sa bayan ng Luntian?",
  },
  {
    type: "essay",
    text: "Sino ang dalawang pangunahing tauhan sa alamat?",
  },
  {
    type: "essay",
    text: "Bakit nagalit si Papel kay Tinta?",
  },
  {
    type: "essay",
    text: "Ano ang ginawa ni Tinta matapos ang kanilang pagtatalo?",
  },
  {
    type: "essay",
    text: "Ano ang naging realizasyon ni Papel habang nag-iisa?",
  },
  {
    type: "essay",
    text: "Ano ang naging epekto ng kanilang pagsasama sa kanilang kaharian?",
  },
  {
    type: "essay",
    text: "Ano ang diwa ng panitikan na naipahayag sa alamat?",
  },
  {
    type: "essay",
    text: "Sino si Lola Bituin?",
  },
  {
    type: "essay",
    text: "Ano ang simbolo ng kawayang ito ayon kay Lola Bituin?",
  },
  {
    type: "essay",
    text: "Ano ang natutunan ni Mateo mula kay Lola Bituin?",
  },
  {
    type: "essay",
    text: "Ano ang napagtanto ni Lola Bituin tungkol sa kawayang nakaangat?",
  },
  {
    type: "essay",
    text: "Ano ang naging epekto ng kawayang iyon sa baryo?",
  },
  {
    type: "essay",
    text: "Anong mensahe ang nais iparating ng alamat?",
  },
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 20; // seconds per question
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
  let resultText = `<strong>Panitikan</strong><br><strong>Quiz Completed!</strong><br>Your score: ${score} out of ${
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
