import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const totalQuestions = 20;
const container = document.getElementById("questions");

// ***1.1*** สร้างคำถาม 20 ข้อ 
for (let index = 1; index <= totalQuestions; index++) {
  container.innerHTML += `
    <div style="margin-bottom:10px;">
      <label>ข้อ ${index}:</label>
      <label><input type="radio" name="q${index}" value="0" required /> 0</label>
      <label><input type="radio" name="q${index}" value="1" /> 1</label>
    </div>
  `;
}

//  ดัก submit form
document.getElementById("answerForm").addEventListener("submit", async (page) => {
  page.preventDefault(); //เมื่อกดส่งจะไม่รีโหลดหน้าเว็บใหม่

  // เก็บคำตอบ
  const answer = {};
  for (let index = 1; index <= totalQuestions; index++) {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    answer[`q${index}`] = selected ? selected.value : null;
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
    console.log("✅ ส่งสำเร็จ:", data);
    alert("ส่งคำตอบเรียบร้อย!");

    // ***1.2*** ค่าที่ส่งไปจะไปแสดงผลตาม id
    const display = document.getElementById("display");
    display.innerHTML = `<pre>${JSON.stringify(data.received, null, 2)}</pre>`;
  } catch (err) {
    console.error("❌ Error:", err);
    alert("ส่งข้อมูลล้มเหลว!");
  }
});
