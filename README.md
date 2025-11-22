# Lung Cancer Risk Prediction System

A machine learning-powered web application that predicts lung cancer risk based on a 12-question health assessment survey using **XGBoost algorithm**.

> 📚 **Academic Project**: Developed for CPE-306 Machine Learning Laboratory

## ⚠️ Disclaimer
This system provides preliminary risk assessment only and cannot replace professional medical diagnosis. Please consult healthcare professionals for accurate medical evaluation.

## 🎯 Key Features

- 12-question health assessment survey
- Risk prediction using XGBoost Model
- Probability score for prediction confidence
- MongoDB integration for data persistence
- User-friendly interface with Bootstrap

## 📊 Prediction Features

1. **YELLOW_FINGERS** - Yellow staining on fingers
2. **ANXIETY** - Anxiety levels
3. **PEER_PRESSURE** - Peer pressure influence
4. **CHRONIC_DISEASE** - Chronic disease history
5. **FATIGUE** - Fatigue symptoms
6. **ALLERGY** - Allergy conditions
7. **WHEEZING** - Wheezing symptoms
8. **ALCOHOL_CONSUMING** - Alcohol consumption
9. **COUGHING** - Coughing frequency
10. **SWALLOWING_DIFFICULTY** - Difficulty swallowing
11. **CHEST_PAIN** - Chest pain symptoms
12. **ANXYELFIN** - Combined anxiety and yellow fingers

## 🛠️ Tech Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white) ![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📸 Screenshots

### Landing Page
![Landing Page](img/01.png)

### Summary Page
![Summary Page](img/02.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 20.17.0)
- npm (>= 10.8.2)
- Python (>= 3.8)
- Docker & Docker Compose

### 1. MongoDB (Docker)

Start MongoDB container:
```bash
docker-compose up -d
```

Connect to MongoDB:
```bash
docker exec -it mongo_db mongosh -u root -p example
```

---

### 2. 💻 Frontend

```bash
cd Frontend
npm install
npm run dev  # Runs on port 5173
```

---

### 3. ⚡ Backend

```bash
cd Backend
pip install --no-cache-dir -r requirements.txt
fastapi dev app/main.py
```

---

### 4. 🤖 ML Environment

Create virtual environment:
```bash
cd ML
python -m venv venv
```

Activate virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run Jupyter Lab:
```bash
jupyter lab
```

Deactivate virtual environment:

**Windows:**
```bash
venv\Scripts\deactivate
```

**Mac/Linux:**
```bash
deactivate
```

> **Note**: Verify correct venv usage with:
> - Windows: `where python`
> - Mac/Linux: `which python`

---

## 📁 Project Structure

```
Lung-Cancer-Prediction/
├── Frontend/              # Vite + Bootstrap UI
│   ├── src/
│   ├── index.html        # Landing page
│   ├── index1.html       # Survey page
│   └── index2.html       # Results page
├── Backend/              # FastAPI Server
│   └── app/
│       └── main.py       # API endpoints + ML prediction
├── ML/                   # Machine Learning
│   ├── Dataset/
│   │   └── survey lung cancer.csv
│   ├── notebooks/
│   │   ├── train.ipynb   # Training notebook
│   │   ├── test_model.ipynb
│   │   ├── XGBoost.ipynb
│   │   └── model.pkl     # Trained model
│   └── src/
│       ├── model.py
│       └── preprocess.py
└── docker-compose.yml    # MongoDB setup
```

---

## 🔄 API Endpoints

### POST `/api/answers`
Submit survey data and get prediction

**Request Body:**
```json
{
  "answer": {
    "YELLOW_FINGERS": 1,
    "ANXIETY": 2,
    "PEER_PRESSURE": 1,
    "CHRONIC_DISEASE": 1,
    "FATIGUE": 2,
    "ALLERGY": 1,
    "WHEEZING": 2,
    "ALCOHOL_CONSUMING": 1,
    "COUGHING": 2,
    "SWALLOWING_DIFFICULTY": 1,
    "CHEST_PAIN": 2,
    "ANXYELFIN": 1
  }
}
```

**Response:**
```json
{
  "status": "ok",
  "inserted_id": "...",
  "received": {...},
  "prediction": 1,
  "probability": [0.23, 0.77]
}
```

### GET `/`
Display latest received answer

---

## 🧪 Model Training

1. Launch Jupyter Lab:
```bash
cd ML
jupyter lab
```

2. Open `notebooks/train.ipynb` or `XGBoost.ipynb`

3. Run all cells to train the model

4. Model will be saved as `model.pkl`

---

## 📊 Model Performance

![Confusion Matrix](img/confusion_matrix.png)

![Model Performance](img/model_performance.png)

![Precision](img/precision.png)

---

## 🗄️ MongoDB Configuration

**Connection String:**
```
mongodb://root:example@localhost:27017/
```

**Database:** `lung_cancer_db`  
**Collection:** `answer`

**Sample Document:**
```json
{
  "_id": "...",
  "answer": {...},
  "prediction": 1,
  "probability": [0.23, 0.77]
}
```

---

## 🌐 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **MongoDB**: mongodb://localhost:27017

---

## 📝 Additional Notes

- **Algorithm**: XGBoost
- **Dataset**: `survey lung cancer.csv`
- **Feature Values**: Range 1-2 (1 = No/Low, 2 = Yes/High)
- **Prediction Output**: 
  - 0 = Low Risk
  - 1 = High Risk
- **Probability**: Array of [low_risk_prob, high_risk_prob]

---

## 👥 Contributors

<table style="border: none;">
  <tr>
    <td align="center" style="border: none;">
      <a href="https://github.com/SavEe2429">
        <img src="https://github.com/SavEe2429.png" width="100px;" style="border-radius: 50%;" alt="profile"/>
        <br />
        <sub><b>SavEe2429</b></sub>
      </a>
      <br />
    </td>
    <td align="center" style="border: none;">
      <a href="https://github.com/ssandd01">
        <img src="https://github.com/ssandd01.png" width="100px;" style="border-radius: 50%;" alt=""/>
        <br />
        <sub><b>2SinceSandy</b></sub>
      </a>
      <br />
    </td>
    <td align="center" style="border: none;">
      <a href="https://github.com/dunte1234">
        <img src="https://github.com/dunte1234.png" width="100px;" style="border-radius: 50%;" alt=""/>
        <br />
        <sub><b>dunte1234</b></sub>
      </a>
      <br />
    </td>
  </tr>
</table>




