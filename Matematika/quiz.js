// Quiz questions
const questions = [
  {
    type: "multiple-choice",
    text: "Ano sa larangan ay mapa? <br> <a href='./Maps.jpg' class='image-link'>View Image</a> ",
    choices: ["A", "B", "C", "D"],
    correct: "D",
    image: "Maps.jpg",
  },
  {
    type: "essay",
    text: "Ano ang isang arithmetic problem?",
  },
  {
    type: "identification",
    text: "Sa isang mapa, ano ang tawag sa linya patayo at pahalang?",
    correct: "longitude at latitude",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 1? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(1,6)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 2? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(2,1)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 3? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(0,0)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 4? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(-4,0)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 5? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(-1,-1)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 6? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(-3,3)",
    image: "graph.jpg",
  },
  {
    type: "identification",
    text: "Ano ang x at y axis sa no. 7? (hal: (5,-3)) <br> <a href='./graph.jpg' class='image-link'>View Image</a>",
    correct: "(-2,5)",
    image: "graph.jpg",
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
  clearInterval(timer);
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const essayContainer = document.getElementById("essayContainer");
  const identificationContainer = document.getElementById(
    "identificationContainer"
  );
  const question = questions[currentQuestionIndex];

  // Reset visibility and content for the new question
  questionElement.innerHTML = question.text; // Use innerHTML to allow HTML links
  choicesElement.innerHTML = "";
  essayContainer.style.display = "none";
  identificationContainer.style.display = "none";
  document.getElementById("essayAnswer").value = "";
  document.getElementById("identificationAnswer").value = "";

  // Handle image pop-up
  const imagePopup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popupImage");
  const overlay = document.getElementById("overlay");

  // Event listener for image links
  const imageLinks = questionElement.querySelectorAll(".image-link");
  imageLinks.forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      if (question.image) {
        // Check if the image URL exists
        popupImage.src = question.image; // Set image source
        popupImage.alt = "Image related to the question"; // Set alt text
        imagePopup.style.display = "block"; // Show pop-up
        overlay.style.display = "block"; // Show overlay
      } else {
        popupImage.src = ""; // Clear the source
        popupImage.alt = ""; // Clear the alt text
        alert("No image available for this question."); // Optional alert
      }
    };
  });

  if (question.type === "multiple-choice") {
    question.choices.forEach((choice) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      button.onclick = () => selectAnswer(choice);
      li.appendChild(button);
      choicesElement.appendChild(li);
    });
    startTimer();
  } else if (question.type === "essay") {
    essayContainer.style.display = "block";
    document.getElementById("nextButton").style.display = "none";
  } else if (question.type === "identification") {
    identificationContainer.style.display = "block";
    document.getElementById("nextButton").style.display = "none";
  }

  // Add event listener to close the popup
  document.getElementById("closeImage").onclick = () => {
    imagePopup.style.display = "none"; // Hide the pop-up
    overlay.style.display = "none"; // Hide the overlay
  };
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
