# MediMap - Healthcare Directory (Mumbai/India)

MediMap is a premium healthcare directory featuring 30+ hospitals, clinics, and specialists across Mumbai. It features a fully integrated Node.js/Express backend and a high-performance React frontend with fluid animations and advanced filtering.

## 🚀 Quick Start

### 1. Run the Backend (Express)
The server handles live data fetching and queue management (stubbed).
```bash
npm run server
```
*Server runs on port 5000*

### 2. Run the Frontend (React + Vite)
```bash
npm install
npm run dev
```
*App runs on port 5173* (Connects to API at :5000)

## 🌟 Key Features
- **Indian Visual Localization**: High-quality Indian-themed medical imagery and professional doctor profiles.
- **Advanced Discovery**: Neighborhood-based filtering (Bandra, Worli, etc.) and Budget-based matching.
- **Premium UI**: Framer Motion transitions, ListingCardSkeletons for smooth loading, and a polished Dark Mode.
- **Emergency Hub**: High-visibility 112 locator and ambulance routing.

## 📂 Data & Tech Stack
- **Master Data**: `src/data/hospitals_data.js` (31 full hospital records)
- **Frontend**: React, Framer Motion, Lucide Icons, Tailwind CSS
- **Backend**: Node.js, Express, Axios (for API communication)
- **Localization**: Premium assets sourced from Unsplash/India collection.

## ⚠️ Data Privacy Note
All data in this prototype is **synthetic**. Doctor names, phone numbers, and pricing are generated for **demonstration purposes only**. Do not use for real medical emergencies.
