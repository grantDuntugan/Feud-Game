import { allRevealed, transitionToQuestion, cleanString, loadQA, cleanBoard } from "./myLib.js";

// Game Questions
let obj = {};
let questions = [];

// Game State
let transitionState = "title";
let recievedFile = false;
let readyForNextQuestion = false;
let questionPos = 0;

// File Processing
let info = "";

// DOM info
let body = document.getElementsByTagName('body')[0];

let fileLoadPromise = new Promise(function(resolve, reject) {
    let fileButton = document.querySelector("input[type='file']");
    fileButton.addEventListener('change', () => {
        resolve(fileButton.files[0]);
    });
});

fileLoadPromise.then(
    result => {
        let fileProcessedPromise = new Promise(function(resolve, reject) {
            let fr = new FileReader();
            fr.readAsText(result);
            fr.onload = function() {
                resolve(fr.result);
            }

        });
        fileProcessedPromise.then(
            result => {
                info = result;
                recievedFile = true;
                info = cleanString(info);
                obj = info[0];
                questions = info[1];
                alert("info loaded!");
            },
            reject => alert("spaghetti code :(")
        )
    },
    error => alert("Spaghetti code strikes again.")
)

cleanBoard();

body.addEventListener('click', () => {
    if (transitionState === "title" && recievedFile) {
        loadQA(questionPos, obj, questions);
        console.log(info);
        let sect = document.getElementsByTagName("section")[0];
        sect.classList.add("fade-out");
        setTimeout(() => {
            sect.classList.add("d-none");
            body.style.backgroundColor = "#213061";
            body.classList.remove("bg-primary");
            sect = document.getElementsByTagName("section")[1];
            sect.classList.remove("d-none");
            sect.classList.add("fade-in");
            document.querySelector(".question").classList.remove("d-none");

        }, 1500);
        transitionState = "displaying question";
    }

    else if (transitionState == "displaying question") {
        let question = document.querySelector(".question")
        question.classList.remove("fade-in");
        question.classList.add("fade-out");
        setTimeout(() => {
            question.classList.add("d-none");
            question.classList.remove("fade-out");
            let board = document.querySelector(".board");
            board.classList.remove("d-none");
            board.classList.add("fade-in");
            let secQues = document.querySelector(".secondary-question");
            secQues.classList.remove('d-none');
            secQues.classList.add("fade-in");
            let xBoard = document.querySelector(".incorrect-space");
            xBoard.classList.remove("d-none");
            xBoard.classList.remove("fade-out");
            xBoard.classList.add("fade-in");
        }, 1500);
        transitionState = "displaying board";
    }

    else if (readyForNextQuestion) {
        readyForNextQuestion = false;
        if (questionPos >= questions.length) {
            alert("Game over!");
        }
        else {
            transitionToQuestion(questionPos, obj, questions);
            transitionState = "displaying question";
        }
    }

    //TODO: switch back to displaying question under some circumstance like arrow button
    else if (transitionState == "displaying board" && allRevealed()) {
        questionPos++;
        readyForNextQuestion = true;
    }


});

body.addEventListener('keypress', (e) => {
    if (e.key === "x") {
        let xes = document.getElementsByClassName("empty-x-symb");
        if (xes.length > 0) {
            xes[0].classList.add("filled-x-symb");
            xes[0].classList.remove("empty-x-symb");
        }
    }
});

let answerBoxes = document.querySelectorAll(".answer-box");
let concealed = document.querySelectorAll(".concealed");
let answers = document.querySelectorAll(".answer");
for (let i = 0; i < answerBoxes.length; i++) {
    answerBoxes[i].addEventListener('click', () => {
        concealed[i].classList.add("d-none");
        answers[i].classList.remove("d-none");
        answers[i].classList.add("fade-in");
    });
}

