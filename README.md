# Talk2Me LearnTube

## System Description
Talk2Me LearnTube is an advanced educational web platform designed to transform passive video consumption into active learning. By leveraging Artificial Intelligence, the system converts standard YouTube videos into structured interactive courses. Users can simply input a YouTube URL, and the system processes the video content (via transcripts) to automatically generate quizzes, theoretical summaries, and writing/speaking exercises. This allows users to test their understanding and engage deeply with the material.

The system is built with a modern microservices-inspired architecture, featuring a robust Node.js backend for data management, a specialized Python service for AI/ML content generation, and a reactive Client-side application built with React.

## Technology Stack

### Frontend (Client)
- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand & TanStack React Query
- **Routing**: React Router DOM (v7)
- **Validation**: Zod + React Hook Form
- **Video Integration**: React Youtube
- **Real-time Communication**: Socket.io-client

### Backend (Main Server)
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, Passport, Bcrypt
- **Job Queue**: Bull (Redis-based queue for background tasks)
- **Real-time Communication**: Socket.io
- **Security**: Helmet, CORS

### AI & Processing Service (Python Server)
- **Framework**: Flask
- **Video Processing**: `yt-dlp` (Metadata extraction), `youtube_transcript_api` (Transcript fetching)
- **AI/Agent**: Custom Logic for Question/Theory generation (likely LLM integration)
- **CORS Handling**: Flask-CORS

## Key Features
1.  **Automated Course Generation**:
    - instantly converts YouTube videos into structured learning modules.
    - Extracts transcripts and metadata automatically.
2.  **Inteligent Quiz System**:
    - Generates relevant multiple-choice questions based on the video content.
    - Evaluation logic to score user answers.
3.  **Comprehensive Learning Modes**:
    - **Theory**: Summaries and key points extracted from the video.
    - **Quiz**: Testing knowledge retention.
    - **Writing & Speaking**: Modules for practicing output skills (currently in development).
4.  **User Progress Tracking**:
    - Accounts for saving courses and tracking progress.
    - Detailed evaluation models (`evaluation`, `quizAnswer`, `speakingAnswer`, `writingAnswer`).
5.  **Robust Architecture**:
    - **Background Processing**: Heavy computation is offloaded to background workers using Bull queues.
    - **Real-time Updates**: Sockets keep the UI updated during content generation.

## Technical Aspects
- **Microservice Communication**: The Node.js backend acts as an orchestrator, communicating with the Python service for heavy-lifting generation tasks.
- **Data Modeling**: Sophisticated MongoDB schemas (`Course`, `LessonPart`, `Question`, `User`) define the relationships between videos, generated content, and user attempts.
- **Security**: API keys protect the internal Python service; User authentication is handled via secure JWT tokens.

## Future Development & Roadmap
The project has a strong foundation, but several areas can be developed to make it a complete commercial-grade product:

1.  **Enhanced AI Generation**:
    - **Speaking Evaluation**: Implement the placeholder logic for analyzing user audio recordings against the video content.
    - **Writing Feedback**: Automated grading and feedback for writing exercises using LLMs.
2.  **Gamification**:
    - Leaderboards, badges, and streaks to encourage daily learning.
3.  **Advanced Analytics Dashboard**:
    - Visual graphs showing user improvement over time (e.g., vocabulary growth, accuracy rates).
4.  **Community Features**:
    - Ability to share generated courses with other users.
    - "Trending" courses section based on popular YouTube videos.
5.  **Offline Mode / PWA**:
    - Progressive Web App capabilities to allow offline review of previously generated courses.
6.  **Flashcard System**:
    - Fully implement the `flashCard` feature with Space Repetition functionality (SRS) for vocabulary retention.
