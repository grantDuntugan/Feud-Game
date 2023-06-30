let body = document.getElementsByTagName('body')[0];
let transitionState = 0;
body.addEventListener('click', () => {
    if (transitionState == 0) {
        let sect = document.getElementsByTagName("section")[0];
        sect.classList.toggle("fade-out");
        setTimeout(() => {
            sect.classList.toggle("d-none");
            body.style.backgroundColor = "#213061";
            body.classList.toggle("bg-primary");
            sect = document.getElementsByTagName("section")[1];
            sect.classList.toggle("d-none");
            sect.classList.toggle("fade-in");

        }, 1500);
        transitionState++;
    }
});

let concealed = document.querySelectorAll(".concealed");
let answers = document.querySelectorAll(".answer");
for (let i = 0; i < concealed.length; i++) {
    concealed[i].addEventListener('click', () => {
        concealed[i].classList.toggle("d-none");
        answers[i].classList.toggle("d-none");
        answers[i].classList.toggle("fade-in");
    });
}