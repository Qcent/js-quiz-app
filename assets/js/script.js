let viewScores = document.querySelector("#high-score"); //for registering click on View High Scores
let timerValue = document.querySelector("#timer-value"); //for displaying onscreen timer
let introCard = document.querySelector(".intro"); //for removing the intro and replacing the intro screen
let qHolder = document.querySelector("main"); // the holder of the questions, introCard, enter initial and high score screens
let tempHolder = {}; //used to store the qHolder when viewing high scores
let quizFeedback = document.querySelector("#feedback"); // for displaying answer feedback

let quizTimer = 25; //number of seconds on the clock. recalculated in startQuiz based on number of questions
let score = 0; // testers score on quiz
let currentQuestion = -1; // the current question
let stopQuiz = false; //a flag to signify the state of the quiz
let hsInput = false; //a flag to signal if the tester has been asked to input initials for high score
let highScores = []; // declare a variable to hold the highscore data

const quizQuestion = [{
        Q: "What is the correct syntax for referring to an external script?",
        options: ["<script src='script.js'>", "<script href='script.js'>", "<script link='script.js'>", ],
        A: "0"
    },
    {
        Q: "Inside which HTML element is JavaScript written?",
        options: ["<java>", "<js>", "<code>", "<script>"],
        A: "3"
    },

    {
        Q: "Commonly used data types DO Not Include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        A: "2"
    },

    {
        Q: "The condition in an if / else statement is enclosed with _________.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        A: "2"
    },
    {
        Q: "The external JavaScript file must contain the &lt;script&gt; tag.",
        options: ["True", "False"],
        A: "1"
    },
    {
        Q: "How do you write \"Hello World\" in an alert box?",
        options: ["msg(\"Hello World\")", "prompt(\"Hello World\")", "alert(\"Hello World\")", "alertBox(\"Hello World\")"],
        A: "2"
    },
    {
        Q: "What is not a valid JavaScript Function declaration?",
        options: ["function newFunction(){}", "var newFunction = ()", "var newFunction = function() {}", ],
        A: "1"
    },
    {
        Q: "In JavaScript all functions will return undefined if no other value is provided.",
        options: ["True", "False", ],
        A: "0"
    },
    {
        Q: "Which of the following is NOT a valid JavaScript comment.",
        options: ["// I am a comment ", "<!-- I am a comment -->", " /* I am a comment */", ],
        A: "1"
    },
    {
        Q: "Math.random() will return a number between 1 and 10.",
        options: ["True", "False", ],
        A: "1"
    },
    {
        Q: "Which is the correct way to define a JavaScript Array.",
        options: ["var cars = \"Ford\", \"Mazda\", \"GMC\" ",
            "var cars = (\"Ford\", \"Mazda\", \"GMC\")",
            "var cars = {0:\"Ford\", 1:\"Mazda\", 2:\"GMC\"}",
            "var cars = [\"Ford\", \"Mazda\", \"GMC\"]"
        ],
        A: "3"
    },
    {
        Q: "All of the following are Primitive Data types.",
        options: ["const, int, var, string", "object, array, method, boolean", "string, boolean, number, null", "string, var, float, int", ],
        A: "2"
    },
    {
        Q: "To generate a random number in JavaScript which method should you invoke?",
        options: ["Math.rand()", "Random.num()", "document.random()", "Math.random()", ],
        A: "3"
    },
    {
        Q: "How would you find the larger of the two numbers 'x' and 'y' ?",
        options: ["Math.max(x, y)", "top(x, y)", "Math.ceil(x, y)", "Math.biggest(x, y)", ],
        A: "0"
    },
    {
        Q: "JavaScript is the same as Java.",
        options: ["True", "False", ],
        A: "1"
    },
    {
        Q: "Which method can you use to monitor user interactions to trigger function calls?",
        options: [".addEventManager", ".setEventListener", ".setEventTarget", ".addEventListener", ],
        A: "3"
    },
    {
        Q: "Which of the following will NOT increment the variable 'i'?",
        options: ["i = i++", "i+1", "i++", "i=i+1", ],
        A: "1"
    },
    {
        Q: "What will the following code return:</h2><pre><code> Boolean(10 > 9)</code></pre>",
        options: ["undefined", "false", "true", "NaN", ],
        A: "2"
    },
    {
        Q: "Which of the following is a valid JavaScript variable name",
        options: ["$Variable1", "1stVariable", "variable-one", "#1Variable", ],
        A: "0"
    },
    {
        Q: "JavaScript variable names are NOT case sensitive.",
        options: ["True", "False", ],
        A: "1"
    },
    {
        Q: "A JavaScript file has an extension of _______.",
        options: [".Java", ".javascript", ".js", ".xml", ],
        A: "2"
    },
    {
        Q: "What function is used to evaluate a string as an interger?",
        options: ["Math.parse()", "parseInt()", "Int.Parse()", "parse.Int()", ],
        A: "1"
    },
    {
        Q: "Which of the dialog boxes display a message and a data entry field?",
        options: ["alert()", "prompt()", "confirm()", "msg()", ],
        A: "1"
    },
    {
        Q: "A function associated with an object is called:",
        options: ["a helper Function", "an ability", "a utility function", "a method", ],
        A: "3"
    },
    {
        Q: "Native JavaScript is a ______ -side programming language.",
        options: ["server", "client", "dark", "east", ],
        A: "1"
    },
    {
        Q: "How do you call a JavaScript function after a certain amount of time has passed?",
        options: ["setTimeout(function, delay)", "wait(delay, function)", "sleep(function, delay)", "timeOut(function, delay)", ],
        A: "0"
    },
    {
        Q: "What will the following code output:</h2> \
            <pre><code> let x = 10/2; \n if(4 < x){ return 'more'; } \n else{ return 'less'; }</code></pre>",
        options: ["undefined", "more", "NaN", "less", ],
        A: "1"
    },
    {
        Q: "What syntax can be used to change the content in the following HTML tag: <span id='changeMe'>Hello</span>",
        options: ["document.getElement ('#changeMe').innerHTML = 'OK'", "document.getElementById ('#changeMe').value = 'OK'",
            "document.querySelector ('changeME').textContent = 'OK'", "document.querySelector ('#changeME').textContent = 'OK'",
        ],
        A: "3"
    },
    {
        Q: "What method would be used to save data to the users browser",
        options: ["storeData.browser()", "setStorage.local()", "systemStorage.setItem()", "localStorage.setItem()", ],
        A: "3"
    },
    {
        Q: "JavaScript will ignore extra spaces.",
        options: ["True", "False", ],
        A: "0"
    },
];
const randomizeQuestions = function() { //mix up them questions real good for replay value
    for (let i = quizQuestion.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        const temp = quizQuestion[i];
        quizQuestion.splice(i, 1, quizQuestion[j]);
        quizQuestion.splice(j, 1, temp);
    }
}
const showHighScore = function() {
    if (qHolder.querySelector("h1") && qHolder.querySelector("h1").textContent === "High scores") { return; } //dont do anything if the High score is already on screen
    tempHolder = qHolder.innerHTML; //save everything that was on screen in the qHolder

    let holder = document.createElement('div'); // recreate the high score info in HTML form
    holder.className = "scores";
    let title = document.createElement('h1');
    title.textContent = "High scores"; //title
    let list = document.createElement('ol'); //make a list

    highScores.forEach(function(hs) { //loop through every score and list it
        let listItem = document.createElement('li');
        listItem.className = "hiscore-entry";
        listItem.textContent = hs.name + " - " + hs.score;
        list.appendChild(listItem);
    });

    let but1 = document.createElement("button"); //make a button
    but1.className = "btn";
    but1.id = "hs-ok";
    but1.textContent = "Go back"

    let but2 = document.createElement("button"); // make another button
    but2.className = "btn";
    but2.id = "hs-clear";
    but2.textContent = "Clear high scores"

    /* start the showing */
    qHolder.innerHTML = '';

    holder.appendChild(title);
    holder.appendChild(list);
    holder.appendChild(but1);
    holder.appendChild(but2);

    qHolder.appendChild(holder);

}
const startQuiz = function() {
    //shuffle up the questions
    randomizeQuestions();
    //clear the main section
    qHolder.innerHTML = '';

    // reset score, timer, question count and stopQuizz flag
    stopQuiz = false;
    currentQuestion = -1;
    score = 0;
    quizTimer = (quizQuestion.length) * 10; // add 10 seconds per question to the timer
    timerValue.textContent = quizTimer; // update on screen timer

    // start the timer
    runQuizTimer();

    //show a question 
    nextQuestion(); //will advance currentQuestion and display it
    //all further steps are handeled byt the qHolder event listener

};
const runQuizTimer = function() {
    if (stopQuiz) { // abort if stopQuiz is true
        return;
    }
    setTimeout(function() {
        if (stopQuiz) { return; } // abort if stopQuiz is true
        quizTimer--; // decrement timer
        timerValue.textContent = quizTimer; //update timer on screen
        if (quizTimer <= 0) { // if out of time 

            endQuiz("Time's Up!"); //end quiz with msg "Time's Up!"
            return; // abort countdown
        }
        runQuizTimer(); // else run this function again 
    }, 1000); //in 1 second
};
const nextQuestion = function() {
    currentQuestion++;
    if (currentQuestion >= quizQuestion.length) {

        endQuiz();
        return;
    }
    renderQuestion(currentQuestion);
}
const renderQuestion = function(idx) {
    //create div element of class question
    let nextQ = document.createElement("div");
    nextQ.className = "question";
    nextQ.setAttribute("data-Q-id", idx); // set a data id for question

    // add h2 element that contains question
    let qh2 = document.createElement('h2');
    qh2.innerHTML = quizQuestion[idx].Q;

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
quizFeedback.displayFeedback = function(msg) {
    /*because JavaScript is wild, lets add this method to the quizzFeedback object we are using as a 
       // DOM reference to the feedback div in the HTML */

    //this method will replace the element 'feedback-wrapper' with a new one when a question is answered
    // the element swap is used to refresh the css animation. f the user clicks quickly through answers
    // this is the only way to restart the animation from the begining

    let oldEl = quizFeedback.querySelector(".feedback-wrapper");
    let newEl = document.createElement('div');
    newEl.className = 'feedback-wrapper flashBack';
    newEl.textContent = msg;

    quizFeedback.replaceChild(newEl, oldEl);
}
const endQuiz = function(msg) {
    qHolder.innerHTML = ''; //clear the main section
    stopQuiz = true; // stop quiz flag for timer abort

    if (!msg) { msg = "All done!"; } // a message for the end screen
    // calculate score
    // score += (quizTimer > 0) ? quizTimer : 0; // if there is time on the clock add it to score otherwise add 0

    renderEndGame(msg);
};
const renderEndGame = function(msg) {
    //create div element of class question
    hsInput = true;
    let endGame = document.createElement("div");
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
const addScore = function(name, score) {
    hsInput = false;
    let isHighScore = false;

    highScores.forEach(function(hs) {
        if (score > hs.score) { // testers score > the stored score
            isHighScore = true; // set highscore flag true
        }
    });
    if ((highScores.length < 5 || isHighScore) && score > 0) { // if total hiscores are less then 5 or the high score flag was set and score is >0
        highScores.push({ "name": name, "score": score }); //add the score
        alert("You got a high score!"); // alert the tester
        highScores.sort(function(a, b) { return b.score - a.score }); //sort by high score
        highScores = highScores.slice(0, 5); //only top 5 scores are kept
        localStorage.setItem('js-quiz-highscore', JSON.stringify(highScores)); //save the high scores
    } else {
        alert("Sorry, your score didn't make the cut.");
    }

    showHighScore();

}
const loadScores = function() {
    if (localStorage.getItem('js-quiz-highscore')) { //if data exists
        highScores = JSON.parse(localStorage.getItem('js-quiz-highscore')); //load the data
        highScores.sort(function(a, b) { return b.score - a.score }); //sort by highest score
    } else { highScores = []; } //make sure its not null
}
const questionButtonHandler = function(event) {

    if (event.target.matches("#start-quiz")) {
        startQuiz();
        return;
    }
    if (event.target.matches("li.btn")) { //only triggers if a li button is clicked (in quiz)
        var answerId = event.target.getAttribute("data-A-id");
        /* Question/Answer LOGIC */
        if (answerId === quizQuestion[currentQuestion].A) { //CORRECT
            console.log("you chose wisely")
            score++;
            quizFeedback.displayFeedback('Correct!');
        } else { /*                                         //WRONG */
            console.log("wrong!")
            quizFeedback.displayFeedback('Wrong!');
            quizTimer -= 10; // deduct time for wrong answer
            timerValue.textContent = quizTimer; //update timer on screen
            if (quizTimer <= 0) { //if tester is now out of time
                endQuiz("Time's Up!");
                return;
            }
        }
        let oldQuestion = document.querySelector(".question[data-Q-id='" + currentQuestion + "']");
        oldQuestion.remove(); //remove old question

        nextQuestion(); //display the next question
        return;
    }
    if (event.target.matches("span.btn")) { //only triggers if a span button is clicked ie the endGame high score form
        timerValue.textContent = 0; // this can be 0 again on screen
        let nameforScore = document.querySelector("#hs-name").value
        addScore(nameforScore, score);
        return;
    }
    if (event.target.matches("#hs-ok")) { //only triggers if highscore ok button is pushed
        qHolder.innerHTML = '';
        if (stopQuiz && !hsInput) { qHolder.appendChild(introCard); } // restore the start screen
        else { qHolder.innerHTML = tempHolder; } //or restore the previous screen
        return;
    }
    if (event.target.matches("#hs-clear")) { //only triggers if highscore clear button is pushed
        if (confirm("Are you sure?")) {
            localStorage.setItem('js-quiz-highscore', ''); //blank the high scores in storage
            highScores = []; //blank highscores in memory
            if (qHolder.querySelector("ol")) { //if highscore list exists
                qHolder.querySelector("ol").remove(); // remove it
            }
        }
        return;
    }
};

viewScores.addEventListener('click', showHighScore);
qHolder.addEventListener("click", questionButtonHandler);

loadScores();