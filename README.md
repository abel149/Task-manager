# 📝 Simple Task Manager Backend

This is a backend API for a Simple Task Manager system built using **Express.js**, **MongoDB**, and **Mongoose**. The system supports user authentication (using JWT), task creation, search, pagination, and basic task management features.

---

## 🚀 Features

### 🔐 Authentication
- **Signup**: Create a new account with name, email, and password.
- **Login**: Authenticate using email and password.
- **JWT**: JSON Web Token-based authentication.
- **CORS**: Enabled for all origins.

### 👤 User API
- `GET /profile` — Get the authenticated user's profile (name, email).

### ✅ Task APIs
- `POST /tasks` — Create a new task.
  - Payload: `{ "name": "Task Name" }`
  - Default status: `pending`
- `GET /tasks` — Retrieve tasks (supports **pagination** and **search**).
  - Query Parameters: `?page=1&limit=10&search=keyword`
- `PATCH /tasks/:id` — Update task status (`pending` / `completed`).
- `DELETE /tasks/:id` — Delete a task.

---

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors package

---
---
## create .env file

PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
---
---

## Project Structure 

├── controllers/
│   ├── auth.js
│   ├── task.js
├── middleware/
│   ├── auth.js
├── models/
│   ├── User.js
│   ├── Task.js
├── routes/
│   ├── auth.js
│   ├── task.js
├── app.js
├── .env
├── server.js

└── README.md

---

## 📦 Installation

```bash
# Clone the repository
git clone git@github.com:abel149/Task-manager.git

# Install dependencies
npm install

