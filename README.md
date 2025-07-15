# 📚 LearnTube – AI-powered English Learning from YouTube

---

## ✨ Features

- 📺 **Create lessons from YouTube videos** using subtitle extraction
- 🧠 **Three interactive practice modes**:
  - **Quiz** – multiple choice questions
  - **Writing** – free-text writing with AI feedback
  - **Speaking** – record and analyze speaking with voice recognition
- 🤖 **AI-generated feedback and scoring** after each lesson part
- 📁 **Organize lessons** by folders, courses (one video per course)
- 🧾 **Track progress**, performance history, and personal vocabulary (coming soon)
- 🔗 **Share lessons** with others (coming soon)

---

## 🧱 MongoDB Data Model Overview


---

## 🧰 Tech Stack

- 💻 **Frontend**: React + TailwindCSS + ShadCN UI
- ⚙️ **Backend**: Node.js + Express.js
- ☁️ **Database**: MongoDB + Mongoose
- 🧠 **AI Integrations**:
  - **DeepSeek API** – content generation, evaluation, feedback
  - **OpenAI Whisper** – speech-to-text for speaking tasks
- 🔐 **Authentication**: JWT / OAuth (optional)

---

## 🔗 External APIs

| API                | Purpose                                        |
|--------------------|------------------------------------------------|
| `DeepSeek API`     | Generate questions, feedback, and scoring     |
| `OpenAI Whisper`   | Convert user speech into text                 |
| `YouTube Transcript API` | Extract subtitles for video-based lessons |

---

> 📌 This project focuses on **personalized language learning** using real-world video content, powered by AI.
