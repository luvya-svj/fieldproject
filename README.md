# 🏥 MediMap: Premium Healthcare Discovery Engine

MediMap is a cutting-edge, source-verified healthcare directory designed to transform how patients find care in Mumbai. Built with a high-performance **PostgreSQL** backend and a fluid **React** frontend, it leverages advanced filtering and side-by-side comparison to make life-critical decisions simple.

> [!IMPORTANT]
> **Production Ready:** This project is fully integrated with a PostgreSQL database and features a robust data seeding system for 30+ verified hospitals.

---

## 🌟 Key Features

### 🔍 Advanced Search & Discovery
- **Dynamic Tabs:** Toggle between **Hospitals** and **Doctors** with specialized filter sets.
- **Symptom-to-Specialist AI:** Intelligent keyword matching suggests the right specialist (e.g., "Chest Pain" → Cardiology).
- **Localized Filtering:** Filter by Mumbai neighborhoods (Bandra, Worli, etc.), consultation fees, and procedure budgets.

### ⚖️ Hospital Comparison Engine
- **Side-by-Side Analysis:** Compare up to 3 hospitals simultaneously.
- **Specialty Focus:** Dynamic "Focus Area" selector (Cardiology, Oncology, etc.) that instantly flags which facilities are specialized for your specific needs.
- **Financial Transparency:** Compare consultation fees and surgical procedure budget ranges at a glance.

### 👨‍⚕️ Comprehensive Doctor Profiles
- **Verified Extraction:** Automatically builds specialist profiles from hospital data.
- **Dynamic Contact Generation:** Deterministic generation of professional contact details (WhatsApp, Email) for over 100+ specialists.
- **Rich OPD Schedules:** Detailed clinical timings and hospital affiliations.

### 🚨 Emergency Mode
- **High-Visibility UI:** One-tap activation for emergency situations.
- **Trauma Center Locator:** Highlights 24/7 verified emergency hubs with priority routing and ambulance contact integration.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Framer Motion, Lucide Icons, Vanilla CSS |
| **Backend** | Node.js, Express, PostgreSQL |
| **Database** | PostgreSQL (Railway/Local), Sequelize/Raw SQL |
| **Deployment** | Railway (Backend), Local Development Support |

---

## 🚀 Quick Start (Local Setup)

### 1. Database Configuration
Ensure you have a local PostgreSQL instance running. Create a database named `medimap`.
Update `backend/.env`:
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=medimap
```

### 2. Seed the Database
Populate the database with verified hospital and doctor records:
```bash
cd backend
npm run seed:pg
```

### 3. Start the Application
Run both terminals:
```bash
# Terminal 1: Backend
npm run server --prefix backend

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 📂 Project Structure
- `frontend/src/data/hospitals_verified.js`: Single source of truth for all healthcare data.
- `frontend/src/utils/doctorUtils.js`: Logic for dynamic doctor profile extraction.
- `backend/db/seed_pg.js`: PostgreSQL database initialization and seeding.

---

## ⚠️ Disclaimer
All data in this prototype is **synthetic**. Doctor names, phone numbers, and pricing are generated for **demonstration purposes only**. Do not use for real medical emergencies.

© 2026 MediMap Healthcare. All rights reserved.
