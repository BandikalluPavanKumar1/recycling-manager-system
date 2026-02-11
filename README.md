# ♻ Recycling Production Line Manager Selection System

A minimal, standalone system for evaluating and ranking candidates for a Recycling Production Line Manager role.

Built using:
- React + Vite
- Mantine UI
- Recharts
- MySQL (Schema Design)
- AI Prompt-Based Evaluation

---

## 🚀 Project Overview

This system demonstrates:

- 📊 Candidate ranking dashboard
- 🧠 AI-based evaluation scoring
- 🗄 Normalized MySQL database design
- 🎯 Skill-based realistic candidate generation
- 📈 Leaderboard & score visualization

The system ranks candidates based on three AI evaluation criteria:

1. Crisis Management
2. Sustainability Knowledge
3. Team Motivation

Each candidate receives a score (1–100 per category), with a maximum total score of **300**.

---

## 🗂 Project Structure

recycling-manager-system/
│
├── index.html
├── package.json
├── README.md
│
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ ├── Dashboard.module.css
│ └── data/
│   └── candidates.js
│
├── sql/
│ ├── schema.sql
│ └── seed_data.sql
│
├── scripts/
│ └── generateData.js
│
└── ai-prompts/
  └── evaluation_rubric.md