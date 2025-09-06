from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Dict, Optional

app = FastAPI()

# ✅ อนุญาตให้ frontend เรียก backend
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# เก็บคำตอบล่าสุด
latest_answer: Dict[str, Optional[str]] = {}

# Pydantic model สำหรับ validate
class AnswerRequest(BaseModel):
    answer: Dict[str, Optional[str]]

# ✅ Endpoint สำหรับรับข้อมูล
@app.post("/api/answers")
async def save_answer(req: AnswerRequest):
    global latest_answer
    latest_answer = req.answer
    print("📥 Received on server:", latest_answer)
    return {"received": latest_answer}

# ✅ Endpoint สำหรับแสดงคำตอบล่าสุดบนเว็บ
@app.get("/", response_class=HTMLResponse)
async def home():
    html_content = f"""
    <html>
        <head>
            <title>คำตอบล่าสุด</title>
        </head>
        <body>
            <h1>คำตอบล่าสุด</h1>
            <pre>{latest_answer}</pre>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)
