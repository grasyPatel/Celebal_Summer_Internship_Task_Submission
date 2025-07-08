# 🛠️ Service Desk (MERN)

A full-stack **Help Desk (Service Desk)** platform that allows users to raise and track tickets for various issues or service requests. The application includes authentication, role-based access (User/Admin), and a ticket management system.

---

## 🚀 Features

### 👥 Authentication
- Secure login and registration using Firebase Auth
- Role-based access: `user` and `admin`
- 📧 **Email Notifications**: Users now receive instant email alerts when their ticket status is updated, ensuring real-time communication and improved support experience.


### 🎫 Ticket System
- Users can raise tickets with:
  - Issue description
  - Priority (Low, Medium, High)
  - Category (Technical, Billing, etc.)
- Track ticket status: Open, Assigned, Resolved
- Admin can:
  - View all tickets
  - Assign/reschedule tickets
  - Change ticket status
  - Send updates to users

### 📊 Dashboards
- **User Dashboard**: Raise and view tickets
- **Admin Dashboard**: View, assign, and manage tickets

### 🗄️ Backend
- Built with **Node.js + Express**
- Uses **MongoDB** for data storage
- Role-based route protection using middleware

### 🌐 Frontend
- Built with **React.js**
- Styled using **Tailwind CSS** or **Material UI**
- Responsive design for all screen sizes

---

## 🧰 Tech Stack

| Technology | Description |
|------------|-------------|
| React.js   | Frontend UI |
| Firebase Auth | Authentication |
| Node.js + Express | Backend API |
| MongoDB    | Database |
| Mongoose   | MongoDB ODM |
| Tailwind/MUI | Styling |
| Axios      | API Requests |

---

## 🔧 Environment Variables

### ✅ Frontend (`frontend/.env`)

```env
# API base URL
REACT_APP_API_BASE=

# Admin Email for role check password: Qwerty@1234
REACT_APP_ADMIN_EMAIL=sita@gmail.com

# Firebase Config
REACT_APP_FIREBASE_API_KEY=y
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

# Optional: EmailJS Config
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
```
### ✅ Frontend (`frontend/.env`)
```env
PORT=
MONGODB_URI=

```
---

### 🧪 Admin Test Credentials
- Email:    sita@gmail.com
- Password: Qwerty@1234
---
### 💻 Getting Started Locally

## Clone the repo
```env 
git clone https://github.com/grasyPatel/Celebal_Summer_Internship_Task_Submission.git
cd service-desk-app-Project
```
## Setup Backend
```env
cd backend
npm install
npm run dev
```
## Setup Frontend
```env
cd /frontend
npm install
npm start
```
---
### 🧾 Deployment
- The app is deployed using Render:

- 🔗 Frontend: https://service-desk-frontend.onrender.com
- 🔗 Backend: https://service-desk-jz6u.onrender.com
---
### 🧑‍💻 Author
- Grace Patel — @grasyPatel






