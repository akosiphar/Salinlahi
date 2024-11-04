// Quiz questions
const questions = [
  {
    type: "multiple-choice",
    text: "Ano ang ibigsabihin ng Cell?",
    choices: [
      "Ang pinakamaliit na yunit na bumubuo sa lahat ng nabubuhay na organismo at mga tisyu ng katawan,",
      "Mga malalaking bahagi ng katawan",
      "Pinaka-malaking parte ng puso",
    ],
    correct:
      "Ang pinakamaliit na yunit na bumubuo sa lahat ng nabubuhay na organismo at mga tisyu ng katawan, ",
  },
  {
    type: "multiple-choice",
    text: "Ano ang mga sustansiya na maaaring makuha nila upang lumaki?",
    choices: [
      "Proteins at organelles",
      "Carbohydrates",
      "Lipids at Fats",
      "Carbon",
    ],
    correct: "Proteins at organelles",
  },
  {
    type: "multiple-choice",
    text: "Alin dito ang taga-bantay ng pagitan ng Gap 1 at Yugtong S?",
    choices: ["MPF at MPK", "CDK at Cyclin", "bilog at tatsulok"],
    correct: "CDK at Cyclin",
  },
  {
    type: "multiple-choice",
    text: "Ano ang tawag sa DNA?",
    choices: ["Deoxyribonucleic acid", "Ribonucleic acid"],
    correct: "Deoxyribonucleic acid",
  },
  {
    type: "multiple-choice",
    text: "Ilang tsekpoint na ang dinaanan ni Cell?",
    choices: [
      "Limang tsekpoint",
      "Sampung tsekpoint",
      "Labing lima na tsekpoint",
      "Tatlong tsekpoint",
    ],
    correct: "Tatlong tsekpoint",
  },
  {
    type: "essay",
    text: "Anong kahalagahan ng utak natin?",
  },
  {
    type: "multiple-choice",
    text: "Alin sa mga porsyento at bahagi nito ang may pinaka-malaking bilang?",
    choices: [
      "40% - Tubig, protein, carbohydrates, at asin",
      "60% - Fat",
      "Labing lima na tsekpoint",
      "Asukal at Asin",
    ],
    correct: "60% - Fat",
  },
  {
    type: "multiple-choice",
    text: "Ano ang tawag sa may pinaka-malaking parte ng utak na nagkokontrol ng paggalaw, pagsalita, pagbabasa, at pag-iisip?",
    choices: ["Heart", "Lungs", "Cerebrum", "Spinal Cord"],
    correct: "Cerebrum",
  },
  {
    type: "multiple-choice",
    text: "Balikan natin ang mga gampanin ni Cerebellum! Ano ang mga pangunahing gampanin niya?",
    choices: [
      "boluntaryong paggalaw ng mga kalamnan at upang mapanatili ang postura, at balanse ng katawan",
      "Pagsasalita, Pagbabasa, Paggalaw",
      "Pagtutok nang maiigi at ang paggalaw ng mata.",
    ],
    correct:
      "boluntaryong paggalaw ng mga kalamnan at upang mapanatili ang postura, at balanse ng katawan",
  },
  {
    type: "multiple-choice",
    text: "Ano ang mga kasama ni Brainstem na nakapalibot sa kaniya?",
    choices: [
      "Pons, Midbrain, at Medulla Oblongata",
      "Heart, Lungs, Diaphragm, at Bronchi",
      "Large Intestine at Small Intestine",
    ],
    correct: "Pons, Midbrain, at Medulla Oblongata",
  },
  {
    type: "multiple-choice",
    text: "Bakit tinago ni Jose sa kaniyang mga kaibigan ang kaniyang ginagawa?",
    choices: [
      "Dahil pagsasabihan siya ng mga ito na bawal ito galawin",
      "Kasi gusto niyang inisin ang kaniyang kaibigan",
      "Dahil ayaw niyang makasama ang mga kaibigan niya",
    ],
    correct: "Dahil pagsasabihan siya ng mga ito na bawal ito galawin",
  },
  {
    type: "multiple-choice",
    text: "Bakit napunta ang magkakaibigan sa ibang panahon?",
    choices: [
      "Dahil may mga dumating na taga ibang planeta",
      "Dahil sa makinarya na inayos ni Jose na biglaang gumana",
    ],
    correct: "Dahil sa makinarya na inayos ni Jose na biglaang gumana",
  },
  {
    type: "essay",
    text: "Bakit lalong umiinit o tumitindi ang lamig sa ibang bahagi ng bansa?",
  },
  {
    type: "essay",
    text: "Ano ang maaaring mangyari sa ating bansa kung patuloy na nagaganap ang Climate change at Polusyon(pollution)?",
  },
  {
    type: "essay",
    text: "Kung ikaw ay nabigyan ng pagkakataon na magsalita tungkol sa climate change, ano ang una mong bibigyan pansin na dapat baguhin?",
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
  let resultText = `<strong>Agham</strong><br><strong>Quiz Completed!</strong><br>Your score: ${score} out of ${
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
