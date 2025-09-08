import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const totalQuestions = 12;
const topic = [
  "YELLOW_FINGERS",
  "ANXIETY",
  "PEER_PRESSURE",
  "CHRONIC",
  "DISEASE",
  "FATIGUE",
  "ALLERGY",
  "WHEEZING",
  "ALCOHOL_CONSUMING",
  "COUGHING",
  "SWALLOWING_DIFFICULTY",
  "CHEST_PAIN",
  "ANXYELFIN"
];
const container = document.getElementById("questions");

// ***1.1*** สร้างคำถาม 12 ข้อ 
for (let index = 1; index <= totalQuestions; index++) {
  container.innerHTML += `
    <div style="margin-left: min(3em , 10%);">
      <label>${index}. ${topic[index-1]}:</label> <br>
      <label><input type="radio" name="${topic[index-1]}" value="0" required /> 0</label> <br>
      <label><input type="radio" name="${topic[index-1]}" value="1" /> 1</label>
    </div>
  `;
}

//  ดัก submit form
document.getElementById("answerForm").addEventListener("submit", async (page) => {
  page.preventDefault(); //เมื่อกดส่งจะไม่รีโหลดหน้าเว็บใหม่

  // เก็บคำตอบ
  const answer = {};
  for (let index = 1; index <= totalQuestions; index++) {
    const selected = document.querySelector(`input[name="${topic[index-1]}"]:checked`);
    answer[`${topic[index-1]}`] = selected ? selected.value : null;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();
    console.log("ส่งสำเร็จ:", data);
    alert("ส่งคำตอบเรียบร้อย!");

    // ***1.2*** ค่าที่ส่งไปจะไปแสดงผลตาม id
    const display = document.getElementById("display");
    display.innerHTML = `<pre>${JSON.stringify(data.received, null, 2)}</pre>`;
  } catch (err) {
    console.error("Error:", err);
    alert("ส่งข้อมูลล้มเหลว!");
  }
});
