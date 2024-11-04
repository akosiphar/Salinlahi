// Quiz questions
const questions = [
  {
    type: "identification",
    text: "Ano ang paraan ng pagsulat ng pamilyang Sinagtala?",
    correct: "baybayin",
  },
  {
    type: "identification",
    text: "At anong tawag sa’kanilang mga naninirahan sa pulo ng Mindoro?",
    correct: "Mangyan",
  },
  {
    type: "identification",
    text: "Ano ang tawag sa mga naninirihan sa kabundukan ng Mindoro?",
    correct: "Hanunoo at Buhid",
  },
  {
    type: "identification",
    text: "at ano ang tawag sa sistemang panulat na ginagamit nila?",
    correct: "Surat Mangyan",
  },
  {
    type: "identification",
    text: "Ang ambahan ay ginagamit para sa pagsusulat ng mga ano?",
    correct: "tula, liham, at mga awit ng pag-ibig",
  },
  {
    type: "identification",
    text: "ano ang katangian nito",
    correct: "mayroong kakaibang karakter at adaptasyon",
  },
  {
    type: "identification",
    text: "Saan inihambing ang pamilyang Sinagtala noong unang panahon?",
    correct: "liwanag ng bituin",
  },
  {
    type: "identification",
    text: "At ano ang naging tungkulin nila?",
    correct: "nagpapanatili ng pagiging likas ng Baybayin",
  },
  {
    type: "multiple-choice",
    text: "Nararapat lamang na piliin ang pinaka-akmang kasagutan: Tagong Ginto at Alahas",
    choices: [
      "Lualhati",
      "Karunugan",
      "Puno ng Molave",
      "Espanyol",
      "Panangga sa Puno",
    ],
    correct: "Puno ng Molave",
  },
  {
    type: "multiple-choice",
    text: "Nararapat lamang na piliin ang pinaka-akmang kasagutan: Pagdadasal at paggawa ng ritwal",
    choices: [
      "Lualhati",
      "Karunugan",
      "Puno ng Molave",
      "Espanyol",
      "Panangga sa Puno",
    ],
    correct: "Panangga sa Puno",
  },
  {
    type: "multiple-choice",
    text: "Nararapat lamang na piliin ang pinaka-akmang kasagutan: Tagapagligtas ng Bayan",
    choices: [
      "Lualhati",
      "Karunugan",
      "Puno ng Molave",
      "Espanyol",
      "Panangga sa Puno",
    ],
    correct: "Lualhati",
  },
  {
    type: "multiple-choice",
    text: "Nararapat lamang na piliin ang pinaka-akmang kasagutan: Tunay na laman ng puno sa kuwento",
    choices: [
      "Lualhati",
      "Karunugan",
      "Puno ng Molave",
      "Espanyol",
      "Panangga sa Puno",
    ],
    correct: "Karunugan",
  },
  {
    type: "multiple-choice",
    text: "Nararapat lamang na piliin ang pinaka-akmang kasagutan: Namumuno sa baryo",
    choices: [
      "Lualhati",
      "Karunugan",
      "Puno ng Molave",
      "Espanyol",
      "Panangga sa Puno",
    ],
    correct: "Espanyol",
  },
  {
    type: "multiple-choice",
    text: "Piliin ang akmang konsepto na nilalaman ng kuwento mula sa apat na pagpipilian.",
    choices: ["1887", "1997", "1877", "1987"],
    correct: "1987",
  },
  {
    type: "multiple-choice",
    text: "Piliin ang akmang konsepto na nilalaman ng kuwento mula sa apat na pagpipilian.",
    choices: ["Mayome", "Nayumi", "Mayumi", "Nayeoni"],
    correct: "Mayumi",
  },
  {
    type: "multiple-choice",
    text: "Piliin ang akmang konsepto na nilalaman ng kuwento mula sa apat na pagpipilian.",
    choices: ["Kabataan", "Mga lider", "Mga guro", "Mga matatanda"],
    correct: "Kabataan",
  },
  {
    type: "multiple-choice",
    text: "Piliin ang akmang konsepto na nilalaman ng kuwento mula sa apat na pagpipilian.",
    choices: [
      "Demokrasya",
      "Kilos-Protesta",
      "Paglaban sa katiwalian",
      "Tinig ng bayan",
    ],
    correct: "Demokrasya",
  },
  {
    type: "multiple-choice",
    text: "Piliin ang akmang konsepto na nilalaman ng kuwento mula sa apat na pagpipilian.",
    choices: ["Kalayaan", "Karapatan", "Katarungan", "Demokrasya"],
    correct: "Demokrasya",
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
  const identificationContainer = document.getElementById(
    "identificationContainer"
  );
  const question = questions[currentQuestionIndex];

  // Reset visibility and content for the new question
  questionElement.textContent = question.text;
  choicesElement.innerHTML = "";
  essayContainer.style.display = "none";
  identificationContainer.style.display = "none";
  document.getElementById("essayAnswer").value = "";
  document.getElementById("identificationAnswer").value = "";

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
  } else if (question.type === "identification") {
    // Display input for identification questions
    identificationContainer.style.display = "block";
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

// Function to submit the identification answer
function submitIdentification() {
  const identificationAnswer = document
    .getElementById("identificationAnswer")
    .value.trim();
  const question = questions[currentQuestionIndex];
  if (identificationAnswer.toLowerCase() === question.correct.toLowerCase()) {
    score++; // Increase score for correct identification answer
  }
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
  document.getElementById("identificationContainer").style.display = "none";
  document.getElementById("completeButton").style.display = "none";

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";

  // Show score
  let resultText = `<strong>Quiz Completed!</strong><br>Your score: ${score} out of ${
    questions.filter((q) => q.type !== "essay").length
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
