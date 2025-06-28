# Spotify Clone 2.0 (MP3)

A powerful full-stack **Spotify Clone** built with the **MERN Stack**, featuring real-time music playback, admin dashboard, chat, and analytics.
 
## 🚀 Features

- Listen to music with play, pause, next, and previous functionality
- Adjustable volume via slider
- Admin dashboard to create and manage albums & songs
- Real-time chat application integrated with music experience
- Online/Offline user status indicator
- See what others are listening to in real-time
- Analytics dashboard with aggregated music data
- Image uploads powered by Cloudinary
- Authentication via Clerk.dev
- Responsive and intuitive UI with material Ui ,Lucid-react, Tailwind Css

---

## 🖥️ Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS & Material Ui 
- Zustand (State Management)
- Clerk (Authentication)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (Image Storage)
- Socket.io (Real-Time Chat)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Spotify-Clone_Task5$6.git
cd Spotify-Clone_Task5&6
```

### 2. Backend Setup
```bash
cd backend
npm install
```
**🔐 Create a .env file inside the backend folder**
```bash
PORT=5050
MONGODB_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email@example.com
NODE_ENV=development

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLERK_SECRET_KEY=your_clerk_secret_key
```
**Start the backend server:**
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
**🔐 Create a .env file inside the frontend folder**
```bash
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
**Start the frontend:**
```bash
npm start
```
### API Endpoints (Sample)

- POST /api/albums – Create album
- GET /api/songs – Fetch all songs
- POST /api/auth/authCallback – Auth webhook

### 🎧 Preview

![Spotify Clone(MP3) <img width="1457" alt="Screenshot 2025-06-29 at 12 01 50 AM" src="https://github.com/user-attachments/assets/21fa3c43-92f9-44ef-b276-b32b91e47f2a" />
<img width="1451" alt="Screenshot 2025-06-29 at 12 02 05 AM" src="https://github.com/user-attachments/assets/754aa694-39ca-4c4c-a535-59e4ed3e99d9" />

<img width="1450" alt="Screenshot 2025-06-29 at 12 02 15 AM" src="https://github.com/user-attachments/assets/48323b9f-0356-4bff-9601-e79a546fa838" />




