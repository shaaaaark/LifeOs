# 🌐 LifeOS – Cross-Platform Personal Life Operating System

> A multi-platform personal data operating system designed to unify emotion tracking, habit management, notes, media storage, reading workflow, social CRM, subscription tracking and health insights — all synchronized across devices with modern cloud architecture.

LifeOS is **not** just an app.  
It is your **personal digital infrastructure** across Web, Mobile, Desktop, Micro-Frontends, and Lightweight Clients.

---

## ✨ Core Features

### 🧠 1. Emotion Tracking (Mood)
- 1–5 mood scoring
- Tags, notes, photos
- Beautiful charts (daily/weekly/monthly trends)
- Device-wide synchronization

### 🔄 2. Habit Tracker
- Daily habits  
- Streak tracking  
- Weekly/Monthly analytics  

### 📝 3. Notes (Markdown)
- Cross-device note-taking  
- Markdown editor  
- “Work-safe” notes for office usage  

### 🖼 4. Media Library
- Photos, screenshots, files
- Tagging, filtering, album organization
- Cloudflare R2 / Supabase Storage

### 📥 5. Inbox (Quick Capture)
- Desktop: paste text, screenshots, drag files
- Mobile: quick notes & camera uploads
- Acts as the “inbox layer” for your life

### 📊 6. Dashboard
- Mood & habit trends  
- Activity heatmaps  
- Upload statistics  
- Productivity metrics  

---

## 🚀 V1.5 – V2.0 Extended Modules

### 💳 Subscription Sentinel
Track subscription costs, expiry dates, and reminders.  
Automatically calculates daily cost.

### 👥 Social Energy CRM
Understand how different people affect your emotional energy.  
Set “care frequency” rules for important relationships.

### 📚 Read-It-Later Hub
Unified reading workflow across devices.  
Mobile → Desktop → Notes.

### 🔋 Body Battery Sync
Sync sleep, steps, heart rate with Apple Health / Google Fit.  
Correlate health metrics with habits & mood.

### 🕰 Time Capsule / On This Day
Daily memory review — photos, notes, mood from past years.

---

## 🖥 Multi-Platform Architecture

LifeOS runs everywhere:

- **Web (React + Vite)**  
- **Mobile (React Native)**  
- **Desktop (Tauri)**  
- **Micro-frontend (Vue3)**  
- **Hippy Lightweight App**  
- **Admin Console (React / Next.js)**  

---

## 🏗️ Tech Stack

### 📦 Monorepo
- Turborepo
- PNPM Workspaces  
- Shared Types / SDK / UI  

### 🛠 Backend
- **Supabase** (PostgreSQL + Auth + Realtime)
- **Cloudflare Workers** (Sync logic)
- **Cloudflare R2** (Media storage)
- **SQLite** (Desktop offline mode)

---

## 🔐 Work Mode (Privacy-First)
Designed for office computers:

- Hide personal emotions  
- Hide private photos/notes  
- Only show “work-safe” data  
- Automatic switch based on time or manual toggle  

---

## 🛡 Data Ownership
Your data is **yours**.

- Export `backup.json`  
- Import schema  
- Full restore / clean-reset  

---

## 🛣 Roadmap (Simplified)

- [x] Core modules (Mood, Habits, Notes, Media, Inbox)
- [x] Multi-device Realtime Sync
- [ ] Subscription Sentinel
- [ ] Social Energy CRM
- [ ] Read-It-Later Hub
- [ ] Body Battery Sync
- [ ] Time Capsule
- [ ] AI Assistant (Insights & Reflection)

---

## 📜 License
MIT

---

## 🤝 Contributing
Contributions welcome!  
Feel free to open issues or submit PRs.

