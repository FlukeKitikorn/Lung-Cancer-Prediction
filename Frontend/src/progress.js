// other.js
let prob = parseFloat(localStorage.getItem("prob"));
console.log("Probability from previous page:", prob);
// <!-- เปอร์เซนต์แสดงผลประเมิน (file : progress.js)-->
let progressCircle = document.querySelector(".progress_circle"),
  progressValue = document.querySelector(".progress_value");
let progressStartValue = 0,
  progressEndValue = prob * 100,
  speed = 40;

let progress = setInterval(() => {
  progressStartValue++;
  progressValue.textContent = `${progressStartValue}%`
  progressCircle.style.background = `conic-gradient(rgb(0, 86, 88) ${
    progressStartValue * 3.6}deg,rgb(177, 177, 177) 0deg)`;
  if (progressStartValue >= progressEndValue) {
    clearInterval(progress)
  }
}, speed);
