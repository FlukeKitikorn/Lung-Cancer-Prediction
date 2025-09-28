import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const topic = [
  "YELLOW_FINGERS",
  "ANXIETY",
  "PEER_PRESSURE",
  "CHRONIC_DISEASE",
  "FATIGUE",
  "ALLERGY",
  "WHEEZING",
  "ALCOHOL_CONSUMING",
  "COUGHING",
  "SWALLOWING_DIFFICULTY",
  "CHEST_PAIN",
  "ANXYELFIN"
];

const topicth = [
  "อาการนิ้วเหลือง",
  "ความวิตกกังวล",
  "ได้รับแรงกดดันจากคนรอบข้าง",
  "โรคเรื้อรัง",
  "อ่อนเพลีย",
  "ภูมิแพ้",
  "เสียงหายใจหวีดหวือ",
  "ดิ่่มเครื่องดื่มแอลกอฮอล์",
  "อาการไอ",
  "ภาวะกลืนลำบาก",
  "อาการเจ็บหน้าอก",
  "อาการนิ้วเหลือง และวิตกกังวล"
];

const topicen = [
  "Yellow Fingers",
  "Anxiety",
  "Peer Pressure",
  "Chronic Disease",
  "Fatigue",
  "Allergy",
  "Wheezing",
  "Alchohol Comsuming",
  "Coughing",
  "Swallowing Difficulty",
  "Chest Pain",
  "Anxiety and Yellow Fingers"
];

const container = document.getElementById("questions");
const backbtn = document.getElementById("backBtn");
const nextbtn = document.getElementById("nextBtn");
const form = document.getElementById("answerForm");
const submitbtn = form.querySelector("button[type='submit']");
const answer = {};

let currentQuestionIndex = 0;

function startQuestion() {
  currentQuestionIndex = 0;
  showQuestion();
}

nextbtn.addEventListener("click", () => {
  const currentQuestion = topic[currentQuestionIndex];

  // บังคับให้เลือกคำตอบก่อนกด next
  if (!answer.hasOwnProperty(currentQuestion)) {
    alert("Please select an answer");
    return; 
  }

  if (currentQuestionIndex < topic.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
});

backbtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

function handleNextButton() {
  //ซ่อนปุ่ม Back ข้อแรก
  if (currentQuestionIndex === 0) {
    document.getElementById("backBtn").style.visibility = "hidden";
  } else {
    document.getElementById("backBtn").style.visibility = "visible";
  }
  //เปลี่ยน next > submit เมื่อถึงข้อท้าย
  if (currentQuestionIndex === topic.length - 1) {
    nextbtn.style.display = "none";
    submitbtn.style.display = "inline-block";
  } else {
    nextbtn.style.display = "inline-block";
    submitbtn.style.display = "none";
  }
}

// ***1.1*** สร้างคำถาม 12 ข้อ 
function showQuestion() {
  let question = topic[currentQuestionIndex];
  let questionTH = topicth[currentQuestionIndex];
  let questionEN = topicen[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  container.innerHTML = `
    <div>
      <label><h3>ข้อที่ ${questionNo}</h3>
      <h2>${questionTH}</h2>
      <h5>${questionEN}</h5>
      </label><br>
      <button class="choicebtn" type="button" data-name="${question}" data-value="1" /> Yes</button> <br>
      <button class="choicebtn" type="button" data-name="${question}" data-value="0" /> No</button>
    </div>
  `;

  //เก็บค่าคำตอบ
  document.querySelectorAll(".choicebtn").forEach(btn => {
    btn.addEventListener("click", function () {
      const qName = this.getAttribute("data-name");
      const value = this.getAttribute("data-value");
      answer[qName] = value;
      //ลบ active ออกจากปุ่ม
      document.querySelectorAll(`.choicebtn[data-name="${qName}"]`).forEach(b => b.classList.remove("active"));
      //ใส่ active ให้ปุ่มที่กด
      this.classList.add("active");
    });

    //ทำให้ยังจำคำตอบข้อที่ผ่านมา
    if (answer[question] !== null) {
      const prevValue = answer[question];
      const prevBtn = document.querySelector(`.choicebtn[data-name="${question}"][data-value="${prevValue}"]`);
      if (prevBtn) {
        prevBtn.classList.add("active");
      }
    }
  });
  handleNextButton();
}
startQuestion();
var prob = 0;

document.getElementById("answerForm").addEventListener("submit", async (page) => {
  page.preventDefault();
  try {
    const res = await fetch("http://127.0.0.1:8000/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();
    console.log("ส่งสำเร็จ:", data);
    alert("ส่งคำตอบเรียบร้อย!");





    // main.js
    let prob = (data.prediction == 1)
    {prob = data.probability[1] };
    localStorage.setItem("prob", prob);
    window.location.href = "../index2.html"; //เปลี่ยนหน้าไป result (index2.html)

  } catch (err) {
    console.error("Error:", err);
    alert("ส่งข้อมูลล้มเหลว!");
  }
});

