# 📱 Social Media App

**Social Media App** is a full-featured social networking web application inspired by Facebook, offering real-time posts, comments, reactions, notifications, and messaging with Google OAuth login.

---

## 🎯 Key Features

- **📝 Post Creation** – Users can write posts with text, images 
- **💬 Comments & Reactions** – Real-time commenting and dynamic reaction tracking  
- **🔄 Sharing** – Share content across the network quickly and intuitively  
- **📩 Real-time Chat** – In-app messaging powered by WebSocket for instant communication  
- **🔔 Notifications** – Real-time alerts for likes, comments, and new connections  
- **👤 Google OAuth** – Secure login with Google for easy onboarding  
- **📱 Responsive UI** – Adaptive layout for desktop and mobile screens  

---

## 🧰 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Material%20UI-0081CB?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
</p>

### Frontend

| Technology     | Description                                    |
|----------------|------------------------------------------------|
| **React**      | Component-based UI library                     |
| **JavaScript** | Core language for building UI behavior         |
| **Material UI**| Pre-built React components for UI              |
| **Socket.IO**  | Real-time communication for messaging          |

### Backend

| Technology        | Description                                           |
|-------------------|-------------------------------------------------------|
| **Node.js + Express** | RESTful API development and server-side logic    |
| **MongoDB**       | NoSQL database for flexible data modeling            |
| **Socket.IO**     | Real-time event-based communication via WebSocket    |

---

## 🛠 Installation

### Requirements

- Node.js ≥ 16  
- MongoDB (local or Atlas instance)  
- Google OAuth credentials (Client ID and Secret)  

### Setup

Clone the project
```bash
# Clone the repository
git clone https://github.com/hoangthh/social-media-app.git
```

Create .env file for frontend and backend (**Required**)
- Frontend .env at /social-media-app/client
```
# Frontend & Backend URL 
REACT_APP_BACKEND_URL=http://localhost:5000
```

- Backend .env at /social-media-app/server
```
# Frontend & Backend URL
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

# Database URL connection
MONGODB_URI=

# Config key for JWT auth
SESSION_SECRET=
JWT_SECRET_KEY=

# Config Google for OAuth Login
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Run
Client UI with ReactJS
```
# Redirect to frontend
cd social-media-app/client

# Install dependencies
npm install

# Local run
npm start
```

Backend APIs with Express.js
```
# Redirect to backend
cd social-media-app/server

# Install dependencies
npm install

# Local run
npm start
```

## 🚀 Usage
- Log in with your Google account

- Add friend with other users by searching

- Create a post (text, image, or video)

- Comment, react, and share posts from others

- Send direct real-time messages to other users

- Receive notifications instantly for interactions

--- 

## 📌 Project Status
✅ Actively maintained, core features complete <br/>
🔜 Roadmap: add follow suggestions, group chat, story features, and enhanced mobile UX

---

## 🧍‍♂️ Author
Developed by Trần Huy Hoàng <br/>
GitHub: @hoangthh <br/>
Email: tranhoang202204@gmail.com

---

📄 License
This project is licensed under the MIT License. See LICENSE for details.
