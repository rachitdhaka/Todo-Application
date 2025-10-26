# 📝 Todo-Application

A **Full-Stack MERN-style Todo Application** built using **React + Node.js + Express + MongoDB + JWT Authentication**, fully typed with **TypeScript**.  
This project demonstrates modern web-development practices such as REST APIs, authentication, and modular architecture.

---

## 🚀 Features

### 🔐 Authentication
- User **Sign Up** and **Login** functionality.
- **JWT (JSON Web Token)** used for secure authentication.
- Tokens stored in **localStorage** and verified on every protected request.
- Middleware on the backend verifies user tokens before allowing CRUD access.

### ✅ Todo Management
- Create, Read, Update, Delete (CRUD) operations for todos.
- Each todo item is **user-specific** (based on JWT token).
- Support for **task status** (complete/incomplete).
- Option to **add priority** or additional fields (if implemented).
- Real-time UI updates after actions (no reload required).

### 💻 Frontend
- Built using **React (TypeScript)**.
- **Axios** for API calls.
- Component-based structure with state and effect hooks.
- **Toasts/alerts** for success/error feedback.
- Minimal, clean, and responsive design.

### ⚙️ Backend
- **Node.js + Express** with **TypeScript**.
- **MongoDB** (via Mongoose) as the database.
- **JWT Authentication** middleware.
- Structured folders: routes, controllers, models, middleware.
- Error handling for invalid credentials, missing tokens, etc.

### 🌐 Deployment
- Frontend deployed on **Vercel**.
- Backend ready for deployment on **Render / Railway / Vercel functions**.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB |
| Authentication | JWT |
| API Calls | Axios |
| Deployment | Vercel |

---

## 📂 Folder Structure

