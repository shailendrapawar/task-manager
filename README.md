# Task Management App

A simple task management system to organize your work across multiple boards.

## Features

- Create and manage boards
- Create, edit, and delete tasks
- Set priority, due dates, and assignees
- Organize tasks by status (Todo, In Progress, Done)
- Dark/Light theme support
- Responsive design

## Quick Start

### Prerequisites
- Node.js
- MongoDB

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_url
PORT=5000
```

Start server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, MongoDB, Mongoose


## Available Commands
Backend:
- `npm run dev` - Start development server
- `npm start` - Start production server

Frontend:
- `npm run dev` - Start dev server
- `npm run build` - Build for production


