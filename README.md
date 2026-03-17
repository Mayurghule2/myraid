## Task Management Application – Full Stack

## Overview

This project is a production-ready Task Management Application built to demonstrate backend architecture, authentication, security practices, database handling, frontend integration, and deployment.

Users can register, log in securely, and manage their own tasks with full CRUD operations.

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Security

* JWT Authentication
* HTTP-only cookies
* bcrypt password hashing
* AES encryption (CryptoJS)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Features

### Authentication

* User Registration
* User Login
* Logout functionality
* JWT stored in HTTP-only cookies
* Password hashing using bcrypt

### Task Management

* Create task
* Read tasks (with pagination)
* Update task status
* Delete task

### Advanced Functionalities

* Pagination support
* Filter by status (pending/completed)
* Search by title (limited due to encryption)
* Protected routes (frontend + backend)

---

## Security Implementation

* Passwords hashed using bcrypt
* JWT stored in HTTP-only cookies (not accessible via JS)
* Secure cookie flags:

  * `httpOnly: true`
  * `secure: true`
  * `sameSite: "none"`
* AES encryption for sensitive fields (title, description)
* CORS configured with credentials
* Environment variables used (no secrets hardcoded)

---

## Folder Structure

```
root/
 ├── backend/
 │    ├── config/
 │    ├── controllers/
 │    ├── middleware/
 │    ├── models/
 │    ├── routes/
 │    ├── utils/
 │    ├── server.js
 │    └── .env
 │
 ├── frontend/
 │    ├── src/
 │    │    ├── api/
 │    │    ├── components/
 │    │    ├── pages/
 │    │    ├── routes/
 │    │    └── App.jsx
 │    └── .env
 │
 └── .gitignore
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
AES_SECRET=your_aes_secret
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## API Documentation

### Auth APIs

#### Register

```
POST /api/auth/register
```

Request:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "User registered"
}
```

---

#### Login

```
POST /api/auth/login
```

Response:

* Sets HTTP-only cookie (`token`)
* Returns success message

---

#### Logout

```
POST /api/auth/logout
```

---

### Task APIs (Protected)

#### Create Task

```
POST /api/tasks
```

#### Get Tasks

```
GET /api/tasks?page=1&limit=5&status=pending&search=task
```

#### Update Task

```
PUT /api/tasks/:id
```

#### Delete Task

```
DELETE /api/tasks/:id
```

---

## Architecture

### Authentication Flow

1. User logs in
2. Backend generates JWT
3. JWT stored in HTTP-only cookie
4. Every request sends cookie automatically
5. Middleware verifies token

---

### Authorization

* Each task is linked to `userId`
* Queries always filtered by authenticated user
* Prevents access to other users' data

---

### Encryption Layer

* Task title and description encrypted using AES
* Decrypted before sending response
* Limitation: encrypted fields cannot be searched directly

---

## Deployment

### Backend (Render)

* Connected GitHub repo
* Environment variables configured
* Runs on HTTPS

### Frontend (Vercel)

* Connected GitHub repo
* Uses environment variable for API URL

---

## Known Limitations

* Search does not work properly on encrypted fields
* No refresh token system
* No role-based access control

---

## Evaluation Mapping

| Criteria       | Implementation                    |
| -------------- | --------------------------------- |
| Code Structure | Modular MVC architecture          |
| Authentication | JWT + HTTP-only cookies           |
| Security       | bcrypt + AES + secure cookies     |
| Database       | MongoDB with user-based isolation |
| API Design     | RESTful with validation           |
| Frontend       | Responsive UI with Tailwind       |
| Deployment     | Vercel + Render                   |
| Documentation  | Complete (this file)              |

---

## How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## Live URLs

* Frontend: https://myraid-bay.vercel.app/
* Backend: https://myraid-veu9.onrender.com

---

## Conclusion

This project demonstrates a complete full-stack system with secure authentication, proper backend design, responsive frontend, and production deployment aligned with industry practices.
