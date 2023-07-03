export function cleanString(info) {
    let obj = {};
    let questions = [];

    info = info.split("\n");
    for (let i = 0; i < info.length; i++) {
        info[i] = info[i].replace(/[^a-zA-Z0-9\- /]/g, '');
    }

    let qPos = 0;
    let aPos = 1;
    while (aPos < info.length) {
        let currQuestion = info[qPos];
        questions.push(currQuestion);
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
    return [obj, questions];
}

export function cleanBoard() {
    document.querySelector("h2").textContent = "";
    document.querySelector("h3").textContent = "";

    // What is a cool color? (board stuff below)
    document.querySelector(".secondary-question").textContent = "";
    for (let i = 0; i < 8; i++) {
        document.getElementById(`answer-slot-${i + 1}`).textContent = "";
        document.getElementById(`point-slot-${i + 1}`).textContent = "0";
    }

    let xes = document.querySelectorAll(".x-symb::after");
    for (let i = 0; i < xes.length; i++) {
        xes[i].style.backgroundColor = "grey";
    }
}

export function loadQA(pos, obj, questions) {
    let currQuestion = questions[pos];
    let answers = obj[currQuestion];

    // Question #..., what is a cool color?
    document.querySelector("h2").textContent = `Question ${pos + 1}`;
    document.querySelector("h3").textContent = currQuestion;

    // What is a cool color? (board stuff below)
    document.querySelector(".secondary-question").textContent = currQuestion;
    let i = 0;
    for (const [key, value] of Object.entries(answers)) {
        document.getElementById(`answer-slot-${i + 1}`).textContent = key;
        document.getElementById(`point-slot-${i + 1}`).textContent = value;
        i++;
    }

    for (i = i; i < 8; i++) {
        document.getElementById(`answer-slot-${i + 1}`).textContent = "";
        document.getElementById(`point-slot-${i + 1}`).textContent = "";
        document.getElementById(`concealed-${i + 1}`).classList.add("d-none");
        document.getElementById(`answer-${i + 1}`).classList.remove("d-none");
        document.getElementById(`point-slot-${i + 1}`).style.borderLeftWidth = "0px";
    }
}

export function resetBoxes() {
    let concealed = document.querySelectorAll(".concealed");
    let answers = document.querySelectorAll(".answer");
    let points = document.querySelectorAll(".points");
    for (let i = 0; i < concealed.length; i++) {
        concealed[i].classList.remove("d-none");
        answers[i].classList.add("d-none");
        answers[i].classList.remove("fade-in");
        points[i].style.borderLeftWidth = "10px";
    }

    let xes = document.getElementsByClassName("x-symb");
    for (let i = 0; i < xes.length; i++) {
        if (!xes[i].classList.contains("empty-x-symb")) {
            xes[i].classList.add("empty-x-symb");
        }
        xes[i].classList.remove("filled-x-symb");
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

// TODO: param dirty fix lol
export function transitionToQuestion(pos, obj, questions) {
    let board = document.querySelector(".board");
    let secQues = document.querySelector(".secondary-question");
    secQues.classList.remove("fade-in");
    secQues.classList.add("fade-out");
    board.classList.remove("fade-in");
    board.classList.add("fade-out");
    document.querySelector(".incorrect-space").classList.remove("fade-in");
    document.querySelector(".incorrect-space").classList.add("fade-out");
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
        document.querySelector(".incorrect-space").classList.add("d-none");
        resetBoxes();
        loadQA(pos, obj, questions);
    }, 1500);
}