let startQuizBtn = document.querySelector("#start-quiz");
let timerValue = document.querySelector("#timer-value");
let introCard = document.querySelector(".intro");
let qHolder = document.querySelector("main");

let quizTimer = 240;
let score = 0;
let currentQuestion = -1;

const quizQuestion = [{
        Q: "What is your name?",
        options: ["John", "Dave", "Kim", "Larry"],
        A: "1"
    },
    {
        Q: "What is your favourite color?",
        options: ["Blue", "Yellow", "Red", "Green"],
        A: "3"
    }
];
const runQuizTimer = function() {
    setTimeout(function() {
        quizTimer--; // decrement timer
        timerValue.textContent = quizTimer; //update timer on screen
        if (quizTimer <= 0) { alert("Time's Up"); return; } // if out of time alert
        runQuizTimer(); // else run this function again 
    }, 1000); //in 1 second
};
const renderQuestion = function(idx) {
    //create div element of class question
    let nextQ = document.createElement("div");
    nextQ.className = "question";
    nextQ.setAttribute("data-Q-id", idx); // set a data id for question

    // add h2 element that contains question
    let qh2 = document.createElement('h2');
    qh2.textContent = quizQuestion[idx].Q;

    //create ul of possible answers
    let qol = document.createElement("ol");

    for (let i = 0; i < quizQuestion[idx].options.length; i++) {
        let qli = document.createElement("li"); // create a li
        qli.className = "btn"; // class of button (btn)
        qli.setAttribute("data-A-id", i); // set a data id for answer
        qli.textContent = quizQuestion[idx].options[i]; // set the text to the possible answer
        qol.appendChild(qli); // append this option to the list
    }
    //append all elements
    nextQ.appendChild(qh2);
    nextQ.appendChild(qol);

    qHolder.appendChild(nextQ);
}
const questionButtonHandler = function(event) {

    if (event.target.matches("li.btn")) { //only triggers if a li button is clicked
        var answerId = event.target.getAttribute("data-A-id");

        if (answerId === quizQuestion[currentQuestion].A) {
            console.log("you chose wisely: ")
            score++;
        } else {
            console.log("wrong")
        }
        let oldQuestion = document.querySelector(".question[data-Q-id='" + currentQuestion + "']");
        oldQuestion.remove();

        nextQuestion();
    }
};
const nextQuestion = function() {
    currentQuestion++;
    if (currentQuestion >= quizQuestion.length) { alert("You Reached the End!! \nYour Score: " + score + "/" + quizQuestion.length); return; }
    renderQuestion(currentQuestion);
}
const startQuiz = function() {
    //clear the main section
    introCard.remove();

    // reset score and timer , question count
    currentQuestion = -1;
    score = 0;
    quizTimer = 240;
    timerValue.textContent = quizTimer;

    // start the timer
    runQuizTimer();


    /* begin to loop through all questions until questions or timer is exhusted */
    //  while (quizTimer > 0 && currentQuestion < quizQuestion.length) {

    //show question and wait for answer
    nextQuestion();
    /* this will not work in loop **************
    //after answer increment counter and show next question
    currentQuestion++;
        
    ******************/
    // }

};

startQuizBtn.addEventListener('click', startQuiz);
qHolder.addEventListener("click", questionButtonHandler);