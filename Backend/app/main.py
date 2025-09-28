from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Dict, Optional
from pymongo import MongoClient
import joblib
import numpy as np

app = FastAPI()

# connected MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["lung_cancer_db"]
collection = db["answer"]

# ✅ อนุญาตให้ frontend เรียก backend
origins = ["http://localhost:5173", "http://127.0.0.1:8000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดลที่ train ไว้
xgb_model = joblib.load("../ML/notebooks/model.pkl")

# เก็บคำตอบล่าสุด
latest_answer: Dict[str, Optional[int]] = {}


# Pydantic model
class AnswerRequest(BaseModel):
    answer: Dict[str, Optional[int]]


# ✅ Endpoint สำหรับรับข้อมูล + ทำนายด้วยโมเดล
@app.post("/api/answers")
async def save_answer(req: AnswerRequest):
    global latest_answer
    latest_answer = req.answer

    # --- เตรียม input ให้โมเดล ---
    # ต้องเรียง features ให้ตรงกับตอน train
    feature_order = [
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
        "ANXYELFIN",
    ]  # <- แก้ตามที่คุณ train จริง
    feature_vector = [latest_answer.get(f, 0) for f in feature_order]

    data = np.array([feature_vector])

    # --- ทำนายด้วยโมเดล ---
    prediction = xgb_model.predict(data)[0]
    probability = xgb_model.predict_proba(data)[0].tolist()

    # --- เก็บลง DB ---
    doc = req.model_dump()
    doc["prediction"] = int(prediction)
    doc["probability"] = probability
    result = collection.insert_one(doc)

    print("Saved to DB with id:", result.inserted_id)
    print("Received:", latest_answer, "Predicted:", prediction)

    return {
        "status": "ok",
        "inserted_id": str(result.inserted_id),
        "received": latest_answer,
        "prediction": int(prediction),
        "probability": probability,
    }


# *** Endpoint สำหรับแสดงคำตอบล่าสุดบนเว็บ FastAPI
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
