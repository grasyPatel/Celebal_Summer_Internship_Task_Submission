# 🛠️ Service Desk (MERN)

A full-stack **Help Desk (Service Desk)** platform that allows users to raise and track tickets for various issues or service requests. The application includes authentication, role-based access (User/Admin), and a ticket management system.

---

## 🚀 Features

### 👥 Authentication
- Secure login and registration using Firebase Auth
- Role-based access: `user` and `admin`

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



