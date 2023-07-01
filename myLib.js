export function cleanString(info) {
    let obj = {};

    info = info.split("\n");
    for (let i = 0; i < info.length; i++) {
        info[i] = info[i].replace(/[^a-zA-Z0-9\- /]/g, '');
    }

    let qPos = 0;
    let aPos = 1;
    while (aPos < info.length) {
        let currQuestion = info[qPos];
        obj[currQuestion] = {};
        while (info[aPos] !== "") {
            if (aPos >= info.length) {
                break;
            }

            let rawAnsString = info[aPos];
            let cleanAns = rawAnsString.split("-")
            cleanAns[0] = cleanAns[0].trim();
            cleanAns[1] = cleanAns[1].trim();

            obj[currQuestion][cleanAns[0]] = cleanAns[1];
            aPos++;
        }
        qPos = aPos + 1;
        aPos += 2;
    }
    console.log(obj);
}

export function resetBoxes() {
    let concealed = document.querySelectorAll(".concealed");
    let answers = document.querySelectorAll(".answer");
    for (let i = 0; i < concealed.length; i++) {
        concealed[i].classList.remove("d-none");
        answers[i].classList.add("d-none");
        answers[i].classList.remove("fade-in");
    }
}

export function allRevealed() {
    let answers = document.querySelectorAll(".answer");
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].classList.contains("d-none")) {
            return false;
        }
    }
    return true;
}

export function transitionToQuestion() {
    let board = document.querySelector(".board");
    let secQues = document.querySelector(".secondary-question");
    secQues.classList.remove("fade-in");
    secQues.classList.add("fade-out");
    board.classList.remove("fade-in");
    board.classList.add("fade-out");
    setTimeout(() => {
        secQues.classList.add("d-none");
        board.classList.add("d-none");
        let qDisp = document.getElementsByTagName("section")[1];
        qDisp.classList.remove("d-none");
        qDisp.classList.remove("fade-out");
        qDisp.classList.add("fade-in");
        let question = document.querySelector(".question");
        question.classList.remove("fade-out");
        question.classList.add("fade-in");
        document.querySelector(".question").classList.remove("d-none");

        resetBoxes();
    }, 1500);
}