let body = document.getElementsByTagName('body')[0];
let transitionState = "title";
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
        console.log("dflsk")
        let question = document.querySelector(".question")
        question.classList.toggle("fade-out");
        setTimeout(() => {
            question.classList.toggle("d-none");
            let board = document.querySelector(".board");
            board.classList.toggle("d-none");
            board.classList.toggle("fade-in");
        }, 1500);
        transitionState = "displaying board";
    }

    //TODO: switch back to displaying question under some circumstance like arrow button

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