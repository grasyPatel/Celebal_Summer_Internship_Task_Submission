import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadsRountes.js";
import subscribeRoutes from "./routes/subscribeRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import productAdminRoutes from "./routes/productAdminRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to shopnow API");
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api",subscribeRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);









app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
