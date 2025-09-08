from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Dict, Optional
from pymongo import MongoClient

app = FastAPI()

# connected MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["lung_cancer_db"]
collection = db["answer"]

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
latest_answer: Dict[str, Optional[int]] = {} # สามารถลบได้ไม่ส่งผลอะไร ถ้าลบก็ไปลบ 2.1 ด้วย แล้วก็ไปเปิดคอมเม้น 2.1.2 แล้วปิด 2.1.1

# Pydantic model สำหรับ validate แปลอีกที เป็นการสร้าง format ข้อมูลให้ตรง
class AnswerRequest(BaseModel):
    answer: Dict[str, Optional[int]]

# ✅ Endpoint สำหรับรับข้อมูล
@app.post("/api/answers") # endpoint ที่ส่งเข้ามา
async def save_answer(req: AnswerRequest):
    # *** 2.1.1 ***
    global latest_answer
    latest_answer = req.answer
    result = collection.insert_one(req.model_dump())
    print("Saved to DB with id: ", result.inserted_id)
    print("Received on server:", latest_answer)
    return {"status": "ok", "inserted_id": str(result.inserted_id),"received": latest_answer}
    # *** 2.1.2 ***
    # result = collection.insert_one(req.dict())
    # print("Saved to DB with id: ", result.inserted_id)
    # print("Received on server:", req.answer)
    # return {"status": "ok", "inserted_id": str(result.inserted_id),"received": req.answer}


# *** 2.1 *** Endpoint สำหรับแสดงคำตอบล่าสุดบนเว็บ FastAPI
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
