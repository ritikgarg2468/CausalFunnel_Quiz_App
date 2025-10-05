# CausalFunnel Quiz Application

A full-stack quiz platform built with React (frontend) and Node.js/Express (backend). This project is designed as an assignment for CausalFunnel by Ritik Garg.

---

## Table of Contents

- [Live Links](#live-links)
- [Overview & Approach](#overview--approach)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Assumptions](#assumptions)
- [Challenges & Solutions](#challenges--solutions)
- [Contributing](#contributing)
- [License](#license)


---

## Live Links

- **GitHub Repository:** [https://github.com/ritikgarg2468/CausalFunnel_Quiz_App.git](https://github.com/ritikgarg2468/CausalFunnel_Quiz_App.git)
- **Frontend Live Demo:** [https://causal-funnel-quiz-app.vercel.app/](https://causal-funnel-quiz-app.vercel.app/)
- **Backend API:** [https://causal-funnel-quiz-app-6ocd.vercel.app/api](https://causal-funnel-quiz-app-6ocd.vercel.app/api)

---

## Overview & Approach

This application provides a seamless quiz experience for users, focusing on simplicity, responsiveness, and reliability.  
**Approach:**  
- The backend is built with Node.js and Express, handling quiz logic, user sessions, and data storage in MongoDB.
- The frontend uses React for a dynamic, single-page experience, with CSS Modules for scoped styling.
- The application is split into clear components:  
  - **StartPage:** Handles user email input and quiz instructions.
  - **QuizPage:** Displays questions, timer, navigation, and progress.
  - **ResultPage:** Shows detailed results and feedback.
- API endpoints are RESTful and designed for clarity and security.

---

## Features

- User email authentication to start quiz
- 15-question timed quiz (30 minutes)
- Navigation between questions
- Real-time progress and timer
- Instant feedback and detailed results
- Responsive, modern UI

---

## Tech Stack

**Frontend:**  
- React  
- CSS Modules

**Backend:**  
- Node.js  
- Express  
- MongoDB (or your chosen DB)

---

## Project Structure

```
CasualFunnal/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ... 
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── Readme.md
└── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

---

### Backend Setup

1. **Navigate to backend folder:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in `backend/` with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start backend server:**
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:5000`.

---

### Frontend Setup

1. **Navigate to frontend folder:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in `frontend/` with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start frontend app:**
   ```sh
   npm start
   ```
   The frontend runs on `http://localhost:3000`.

---

## Environment Variables

| Variable            | Location   | Description                       |
|---------------------|------------|-----------------------------------|
| PORT                | backend    | Backend server port               |
| MONGODB_URI         | backend    | MongoDB connection string         |
| JWT_SECRET          | backend    | JWT authentication secret         |
| REACT_APP_API_URL   | frontend   | Backend API base URL              |

---

## API Endpoints

**Base URL:** `/api`

- `POST /api/quiz/start` – Start a new quiz session
- `GET /api/quiz/questions` – Get quiz questions
- `POST /api/quiz/submit` – Submit answers and get results

---

## Scripts

### Backend

- `npm start` – Start server
- `npm run dev` – Start server with nodemon

### Frontend

- `npm start` – Start React app
- `npm run build` – Build for production

---

## Assumptions

- Each user starts the quiz by entering a valid email address.
- Only one quiz session per email at a time.
- All quiz questions are multiple choice and fetched from the backend.
- The timer starts when the quiz begins and cannot be paused.
- The backend is running locally or on a secure server.

---

## Challenges & Solutions

- **State Management:**  
  Used React Context to manage quiz state and user progress across components.
- **Timer Accuracy:**  
  Implemented a reliable timer using React hooks and ensured synchronization with backend validation.
- **Responsive Design:**  
  Utilized CSS flexbox and media queries to ensure the UI works well on all devices.
- **Error Handling:**  
  Added clear error messages for invalid email, network issues, and backend failures.
- **API Security:**  
  Used JWT for secure session management and protected quiz data endpoints.

---

## Contributing

Pull requests are welcome!  
Please open an issue first to discuss major changes.

---

## License

This project is licensed under the MIT License.

---

**CausalFunnel assignment by Ritik Garg.**
