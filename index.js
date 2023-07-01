import { allRevealed, transitionToQuestion } from "./myLib.js";

let body = document.getElementsByTagName('body')[0];
let transitionState = "title";
let readyForNextQuestion = false;

body.addEventListener('click', () => {
    if (transitionState === "title") {
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
        }, 1500);
        transitionState = "displaying board";
    }

    else if (readyForNextQuestion) {
        console.log("idk")
        readyForNextQuestion = false;
        transitionToQuestion();
        //TODO: update questions, points, etc.
        transitionState = "displaying question";
    }

    //TODO: switch back to displaying question under some circumstance like arrow button
    else if (transitionState == "displaying board" && allRevealed()) {
        readyForNextQuestion = true;
        console.log('ready')
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

