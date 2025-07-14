# 🛍️ ShopNow - Fashion E-commerce Platform

ShopNow is a modern, responsive, and fully-functional e-commerce web app built for clothing and fashion products. It allows users to explore, filter, and purchase fashion items for both men and women with real-time availability, admin product control, and seamless checkout experience.

## 🌟 Features

### 🧑‍💻 User Side
- 🔍 **Browse Products** by category: Men, Women, Top Wear, Bottom Wear
- 🔎 **Advanced Filters**: Category, Gender, Colors, Sizes, Materials, Brands
- 🎯 **Sort Options**: Price, Popularity, Newest, A-Z, Z-A
- 🆕 **New Arrivals Section**
- ❤️ **Best Sellers** section
- 👗 **You May Also Like** recommendations
- 🛒 **Cart & Checkout Flow**
- 📦 **Order Summary & History**
- 🌐 **Responsive Design** across devices

### 🔐 Authentication
- 🔑 Login / Logout (JWT-based)
- 🧾 Protected routes (Admin access)

### 🧑‍💼 Admin Panel
- 📤 Add / Update / Delete products
- 📊 View orders and sales

### 📸 Image Handling
- 🌩️ Product images uploaded via **Cloudinary**
- 🖼️ Support for multiple images per product

### 🛍️ Orders & Payment
- 📦 Order Summary page
- 💳 Payment Integration (PayPal / Card)
- 🚚 Shipping, Tax, and Subtotal Calculations

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js**
- **Redux Toolkit** (state management)
- **TailwindCSS** (UI styling)
- **React Router** (routing)
- **Axios** (API calls)

### 🛠️ Backend
- **Node.js + Express**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **Cloudinary** (image hosting)

---

## 📁 Folder Structure (Frontend)

```
src/
├── assets/
├── components/
│   ├── Layout/
│   ├── Products/
│   ├── Auth/
│   └── Common/
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Checkout.jsx
│   └── AdminPanel.jsx
├── redux/
│   ├── slices/
│   │   └── productsSlice.js
│   └── store.js
├── utils/
└── App.jsx
```

---

## 🛠️ Setup Instructions

### 🚀 Frontend
```bash
cd frontend
npm install
npm run dev
```

### 🔧 Backend
```bash
cd backend
npm install
npm run server
```

Make sure to configure your `.env` file with MongoDB URI, JWT_SECRET, CLOUDINARY credentials, etc.

---

## 🧪 API Routes

### Products
- `GET /api/products` - All products
- `POST /api/products` - Add product (Admin)
- `GET /api/products/:id` - Product detail
- `GET /api/products/best-seller` - Best seller products

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders/my-orders` - User orders

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

---

## 🔐 Environment Variables

Create a `.env` file in both `frontend` and `backend` directories:

### Backend
```env
MONGO_URI=your_mongo_db_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
PORT=9000
```

### Frontend (Vite)
```env
VITE_BACKEND_URL=http://localhost:9000
```

---

## 📦 Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account


### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be running at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:9000`

---

## 🔧 Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
npm run run       # Start server with nodemon
npm start           # Start production server
```

---

## 📸 Screenshots

<img width="1406" height="685" alt="Screenshot 2025-07-14 at 3 28 32 PM" src="https://github.com/user-attachments/assets/e355d3b2-81e5-45a4-be45-356e3b670c20" />
<img width="1384" height="794" alt="Screenshot 2025-07-14 at 3 30 11 PM" src="https://github.com/user-attachments/assets/ff9d1d0f-2c36-426a-87ca-a44d18ac0d31" />
<img width="1101" height="689" alt="Screenshot 2025-07-14 at 3 29 15 PM" src="https://github.com/user-attachments/assets/5a895a24-931f-4716-a501-b1ff395939be" />
<img width="1265" height="536" alt="Screenshot 2025-07-14 at 3 29 24 PM" src="https://github.com/user-attachments/assets/6c6fda76-db24-42de-93f0-3159855f801c" />



---



## 🙏 Acknowledgments

- React.js community for amazing documentation
- TailwindCSS for utility-first CSS framework
- MongoDB for flexible database solutions
- Cloudinary for image management

---



**Made with ❤️ by Grace Patel**

Feel free to clone, fork, or contribute to this project for learning or building your own fashion store!
