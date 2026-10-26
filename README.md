# FocusForge Productivity

FocusForge is a lightweight productivity application designed to help users manage their daily tasks. This repository serves as a starter project for students to explore, analyze, and improve both code architecture and product design.

---

## Features

### Task Management
- Add new tasks
- View a list of existing tasks
- Mark tasks as completed

### Focus Sessions
A task-linked 25-minute timer that helps users choose an unfinished task and structure focused work with start, pause, resume, and reset controls.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Database:** PostgreSQL with Prisma ORM

---

## Getting Started

### Prerequisites

Before running the project, ensure the following tools are installed:

- Node.js (v16 or higher)
- PostgreSQL running locally

---

### 1. Clone the Repository

```bash
git clone <repo-url>
cd focusforge-productivity
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies.

```bash
cd server
npm install
```

Copy the sample environment file and update `DATABASE_URL` with your local PostgreSQL credentials. Keep `.env` private and do not commit it.

```powershell
Copy-Item .env.example .env
```

Run database migrations.

```bash
npx prisma migrate dev --name init
```

Start the backend server.

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory.

```bash
cd client
npm install
npm run dev
```

The application should now be running locally.

---

## Project Goal

FocusForge helps users stay organized, choose a concrete task, and spend a focused interval working on it.

---

## Product Improvement

The original Motivation Mode displayed rotating quotes. It has been replaced
with task-linked focus sessions because choosing a task and tracking a work
interval provides a more actionable aid to productivity. See
[`Changes.md`](./Changes.md) for the evaluation and implementation details.

---

## Submission Expectations

When completing this challenge, ensure that:

- The application continues to run correctly
- Any improvements integrate properly with the existing structure
- Your reasoning and changes are documented in `Changes.md`

---

## Notes

In real engineering environments, developers often inherit features that were built with good intentions but may not ultimately improve the product experience.

This challenge focuses on evaluating existing functionality and making thoughtful improvements to the product.
