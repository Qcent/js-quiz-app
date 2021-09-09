let startQuizBtn = document.querySelector("#start-quiz");
let viewScores = document.querySelector("#high-score");
let timerValue = document.querySelector("#timer-value");
let introCard = document.querySelector(".intro");
let endGame = document.createElement("div");
let qHolder = document.querySelector("main");
let quizFeedback = document.querySelector("#feedback");

let quizTimer = 240;
let score = 0;
let currentQuestion = -1;
let stopQuiz = false;

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
const showHighScore = function() {
    alert("these are the highScores");
}
const runQuizTimer = function() {
    if (stopQuiz) { // abort if stopQuiz is true
        return;
    }
    setTimeout(function() {
        if (stopQuiz) { return; } // abort if stopQuiz is true
        quizTimer--; // decrement timer
        timerValue.textContent = quizTimer; //update timer on screen
        if (quizTimer <= 0) { // if out of time 
            stopQuiz = true; // stop quiz
            endQuiz("Time's Up"); //alert
            return; // abort countdown
        }
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
    if (event.target.matches("span.btn")) { //only triggers if a span button is clicked ie the endGame high score form
        alert("high score entered");
    }
};
const nextQuestion = function() {
    currentQuestion++;
    if (currentQuestion >= quizQuestion.length) {
        stopQuiz = true;
        endQuiz();
        return;
    }
    renderQuestion(currentQuestion);
}
const startQuiz = function() {
    //clear the main section
    introCard.remove();

    // reset score, timer, question count and stopQuizz flag
    stopQuiz = false;
    currentQuestion = -1;
    score = 0;
    quizTimer = 240;
    timerValue.textContent = quizTimer; // update on screen timer

    // start the timer
    runQuizTimer();

    //show a question 
    nextQuestion(); //will advance currentQuestion and display it
    //all further steps are handeled byt the qHolder event listener

};
const renderEndGame = function(msg) {
    //create div element of class question
    endGame.className = "outro";

    // add h2 title
    let title = document.createElement('h2');
    title.textContent = msg; // out of time!  | all done!

    //create div with score
    let text = document.createElement("div");
    text.textContent = "Your final score is " + score + ".";

    //another div for the form
    let form = document.createElement('div');
    form.className = "form";
    form.innerHTML = "<span>Enter Initials:</span> <input type='text' maxlength=4 id='hs-name'><span class='btn highscore'>Submit</span>";

    //append all elements
    endGame.appendChild(title);
    endGame.appendChild(text);
    endGame.appendChild(form);

    qHolder.appendChild(endGame);
}
const endQuiz = function(msg) {

    if (!msg) { msg = "All done!"; } // make sure this isnt null

    // qHolder.appendChild(introCard); // restore the start screen

    // calculate score
    score += quizTimer;

    renderEndGame(msg);

    //quizFeedback.textContent = msg + "Your Score: " + score;

};

viewScores.addEventListener('click', showHighScore);
startQuizBtn.addEventListener('click', startQuiz);
qHolder.addEventListener("click", questionButtonHandler);