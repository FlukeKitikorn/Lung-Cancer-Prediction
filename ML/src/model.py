import joblib
import os
from dotenv import load_dotenv

# โหลดค่า .env
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

MODEL_PATH = os.getenv("MODEL_PATH")
THRESHOLD = float(os.getenv("THRESHOLD", 0.5))

_model = None

def load_model():
    global _model
    if _model is None:
        if MODEL_PATH is None or not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    return _model

def predict(features: list[float]) -> dict:
    model = load_model()
    prob = model.predict_proba([features])[0][1]
    result = "positive" if prob >= THRESHOLD else "negative"
    return {"prediction": result, "probability": prob}
