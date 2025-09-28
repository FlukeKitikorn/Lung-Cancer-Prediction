<strong><h1 align="center">Frontend</h1></strong>

### Requirement
- node js (>= 20.17.0)
- npm (>= 10.8.2)

### Steps

```bash
cd Frontend #เข้าโฟลเดอร์ project 
npm install #ติดตั้ง Dependecise
npm run dev #run local wesite port 5173
```

<hr>

<strong><h1 align="center">Backend</h1></strong>

### Steps

```bash
cd Backend #เข้าโฟลเดอร์ project 
pip install --no-cache-dir -r requirements.txt #ติดตั้ง Dependecise
fastapi dev app/main.py #run server 
```

<hr>

<strong><h1 align="center">ML</h1></strong>

### Steps 

```bash
cd ML #เข้าโฟลเดอร์ project
python -m venv venv #สร้าง Python packages ของโปรเจกต์นี้โดยเฉพาะ
pip install --no-cache-dir -r requirements.txt #ติดตั้ง Dependecise
```
#### สร้าง VENV 

```bash
#Window
venv\Scripts\activate #เปิดใช้งาน venv
venv\Scripts\deactivate #ปิดใช้งาน venv
```

```bash
#Mac/Linux
source venv/bin/activate #เปิดใช้งาน venv
source venv/bin/deactivate #ปิดใช้งาน venv
```

> หมายเหตุ : สามารถเช็คการทำงานของ venv ได้ว่าใช้ตัวไหนใน project ด้วยคำสั่ง : which python (Mac/Linux) | where python (Windows)

#### เมื่อ activate แล้ว และเช็คแล้วว่าเป็น venv ที่สร้างขึ้นมาในโปรเจค 
```bash
pip install -r requirements.txt #ติดตั้ง Dependecise
```

#### ใช้ งาน Jupyter lab ใน project
```bash
jupyter lab
```
docker exec -it mongo_db mongosh -u root -p example


