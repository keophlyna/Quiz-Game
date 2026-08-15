const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0 ;
let answerDisabled  = false;

totalQuestionsSpan.textContent = quizQuestions.length; 
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz() { 
    // reset vars
    currentQuestionIndex = 0;
    score = 0;

    // remove the start screen by specific the classlist ('active')
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    // then call the showqueston function 
    showQuestion();
}

function showQuestion() { 
    //reset state  
    answerDisabled = false;

    //set var of currentquestion index
    const currentQuestion = quizQuestions[currentQuestionIndex];
    //increment the currrentquestionspan by 1
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // set the progresspercent by divide currentquesindex /quizquestion.index * 100 
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    // style the width 
    progressBar.style.width = progressPercent + "%";
    
    questionText.textContent = currentQuestion.question;
    //showbutton question 
    //create an empty innerHTML
    answersContainer.innerHTML="";

    //loop thru the object of currentQuestion
    currentQuestion.answers.forEach(answer => { 
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        
        answersContainer.appendChild(button);
    })
    //Create the button
    //add answer-btn by using classList linked with button
    //create a button dataset name correct 
    //add click event listen with selectAnswer function. once its clicked, append button
}

function selectAnswer(event) { 
    // optimization check 
    // if answer is true, return ture; 
    if(answerDisabled) return ;
    answerDisabled = true; 
    
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach((button) => { 
        if (button.dataset.correct === 'true') { 
            button.classList.add('correct');
        } else { 
            button.classList.add('incorrect');
        }
    });
    if (isCorrect) { 
        score += 1;
        scoreSpan.textContent = score;
    }
    setTimeout(() => { 
        currentQuestionIndex ++; 
        if (currentQuestionIndex < quizQuestions.length){ 
            showQuestion();
        } else { 
            showResults();
        }
    }, 1000) 
}
function showResults() { 
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;;
    
    if (percentage === 100) { 
        resultMessage.textContent = 'Jui mray hz ah nis pkae kron ber';
    } else if ( percentage >= 80) { 
        resultMessage.textContent = 'Nek tver ban laor hz';
    } else if (percentage >= 60) { 
        resultMessage.textContent = 'eryyy doch ach';
    } else if (percentage >= 40) { 
        resultMessage.textContent = 'ke ot rp nek pler te';
    } else { 
        resultMessage.textContent = 'ah nis pler jmr';
    }
}
function restartQuiz() { 
    console.log('Restarted quiz');
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    startQuiz();
}