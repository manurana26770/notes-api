# 📝 Notes API

A secure and scalable RESTful API for managing personal notes, built using **Node.js**, **Express**, and **MongoDB**.

## ✨ Features

- User registration and login with JWT-based authentication
- Password hashing with Bcrypt
- Create, read, update, and delete personal notes
- Auth-protected routes for user-specific notes
- Central error handling and field validation
- Modular project structure with controllers, routes, models, and middleware

## 🔐 Authentication

Uses JSON Web Tokens (JWT) to protect all `/api/notes` routes. Token must be sent in the `Authorization` header.

## 🧰 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Bcrypt
- CORS & Morgan middlewares

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/manurana26770/notes-api.git

2. Install dependencies:
  npm install

3.Set up .env:
  MONGO_URI=your_mongodb_uri  
  JWT_SECRET=your_jwt_secret

4.Start the server:
  npm start

<p>Make sure you send Autherization token when required in form : Bearer <token>I </p>



