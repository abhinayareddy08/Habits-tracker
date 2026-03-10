# 🎮 DayQuest — Complete Project Overview

> A gamified daily life tracker where every day is a quest. Track habits, journal your day, earn XP, level up and unlock badges.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | NestJS |
| Database | MySQL |
| ORM | TypeORM |
| Auth | JWT + Passport + bcryptjs |

---

## ✨ Features

### 🔐 Authentication
- User registration with name, email and password
- Secure login with JWT token
- Passwords hashed with bcryptjs
- Protected routes (only logged in users can access the app)

### ✅ Habits
- Create custom habits with a name, icon and color
- Delete habits you no longer need
- Check off habits every day
- Each habit tracks its own streak

### 📝 Daily Entry
- Write a journal/diary of what you did today
- Set your mood for the day (happy, neutral, sad, angry)
- View and edit any past day's entry
- Each entry is tied to a specific date

### 📅 Calendar
- Monthly calendar view
- Each day shows a color indicator:
  - 🟢 Green → all habits completed
  - 🟡 Yellow → some habits completed
  - ⚫ Grey → nothing logged
- Click any day to view that day's habits and journal

### 🔥 Streaks
- Each habit tracks how many days in a row it was completed
- Streak resets if you miss a day
- Longest streak is saved on your profile

### ⭐ XP System
- Earn XP for completing each habit
- Earn XP for writing a daily journal entry
- Earn XP for setting your mood
- XP accumulates over time

### ⚡ Levels
- Users start at Level 1
- Level up automatically when enough XP is earned
- Each level requires more XP than the last
- Level is displayed on the dashboard and profile

### 🏆 Badges & Achievements
- Unlock badges for reaching milestones
- Example badges:
  - 🥇 **First Step** → Complete your first habit
  - 🔥 **On Fire** → 7 day streak on any habit
  - 📝 **Storyteller** → Write 10 journal entries
  - ⚡ **Level 5** → Reach level 5
  - 💯 **Century** → Complete 100 habits total
  - 🌟 **Dedicated** → 30 day streak

---

## 🗄️ Database Structure

### `users`
| Column | Type | Description |
|--------|------|-------------|
| id | int (PK) | Auto generated ID |
| name | varchar | User's full name |
| email | varchar (unique) | User's email |
| password | varchar | Hashed password |
| xp | int | Total XP earned (default 0) |
| level | int | Current level (default 1) |
| createdAt | datetime | Account creation date |

### `habits`
| Column | Type | Description |
|--------|------|-------------|
| id | int (PK) | Auto generated ID |
| userId | int (FK) | Owner of the habit |
| name | varchar | Habit name |
| icon | varchar | Emoji or icon |
| color | varchar | Habit card color |
| createdAt | datetime | When habit was created |

### `daily_entries`
| Column | Type | Description |
|--------|------|-------------|
| id | int (PK) | Auto generated ID |
| userId | int (FK) | Owner of the entry |
| date | date | The day this entry is for |
| mood | varchar | User's mood for the day |
| journalText | text | What the user wrote |
| createdAt | datetime | When entry was created |

### `habit_logs`
| Column | Type | Description |
|--------|------|-------------|
| id | int (PK) | Auto generated ID |
| habitId | int (FK) | Which habit was completed |
| userId | int (FK) | Who completed it |
| date | date | The day it was completed |

### `achievements`
| Column | Type | Description |
|--------|------|-------------|
| id | int (PK) | Auto generated ID |
| userId | int (FK) | Who unlocked it |
| badgeType | varchar | Which badge was unlocked |
| unlockedAt | datetime | When it was unlocked |

---

## 📱 Pages & Screens

### 1. Login Page
- Email and password input
- Login button
- Link to register

### 2. Register Page
- Name, email, password, confirm password
- Register button
- Link to login

### 3. Dashboard (Home)
- Welcome message with username
- XP progress bar to next level
- Current level and streak
- Today's habit checklist
- Quick journal entry button
- Recent badges

### 4. Today's Entry Page
- Mood selector (emoji buttons)
- Habit checklist
- Journal text area
- Save button

### 5. Calendar Page
- Monthly calendar with color indicators
- Click a day to view that day's entry and habits

### 6. Habits Management Page
- List of all habits
- Add new habit (name, icon, color)
- Delete habit

### 7. Profile & Stats Page
- User info (name, email, avatar)
- Current level + XP bar
- Total habits completed
- Longest streak
- All badges (locked and unlocked)

---

## 🗂️ Project Folder Structure

```
dayquest/
├── backend/                      → NestJS
│   └── src/
│       ├── auth/                 → Login, Register, JWT
│       ├── users/                → User module
│       ├── habits/               → Habits CRUD
│       ├── daily-entries/        → Journal + mood
│       ├── habit-logs/           → Daily habit completions
│       ├── achievements/         → Badges logic
│       └── typeorm/
│           └── entities/         → All database entities
│
└── frontend/                     → React + Vite
    └── src/
        ├── pages/                → All pages
        ├── components/           → Reusable UI components
        ├── api/                  → API call functions
        ├── hooks/                → Custom React hooks
        └── context/              → Auth context (store JWT)
```

---

## 🛣️ Build Roadmap

| Phase | Task | Status |
|-------|------|--------|
| 1 | MySQL setup + DB connection | ✅ Done |
| 2 | User entity | ✅ Done |
| 3 | Users module | ✅ Done |
| 4 | Auth (register + login + JWT) | 🔄 In Progress |
| 5 | Habits module (CRUD) | ⏳ Pending |
| 6 | Daily entries module | ⏳ Pending |
| 7 | Habit logs module | ⏳ Pending |
| 8 | Gamification (XP, levels, badges) | ⏳ Pending |
| 9 | Frontend — Auth pages | ⏳ Pending |
| 10 | Frontend — Dashboard | ⏳ Pending |
| 11 | Frontend — Calendar | ⏳ Pending |
| 12 | Frontend — Profile & Badges | ⏳ Pending |