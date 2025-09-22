
document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:5173/results";
  const userId = "u001";

  const progressCircle = document.querySelector(".progress_circle");
  const progressValue = document.querySelector(".progress_value");

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const userResults = data.filter(item => item.userId === userId);

      if (userResults.length === 0) {
        console.warn("ไม่พบข้อมูลผู้ใช้");
        setProgress(999); // ค่าเริ่มต้นถ้าไม่เจอข้อมูล
        return;
      }

      userResults.sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestScore = parseInt(userResults[0].score);

      setProgress(latestScore);
    })
    .catch(err => {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", err);
      setProgress(0);
    });

  function setProgress(score) {
    // อัปเดตข้อความแสดงผลทันที
    progressValue.textContent = `${score}%`;

    // อัปเดต background วงกลมตามเปอร์เซ็นต์
    progressCircle.style.background = `conic-gradient(rgb(0, 86, 88) ${
      score * 3.6
    }deg, rgb(177, 177, 177) 0deg)`;
  }
});
