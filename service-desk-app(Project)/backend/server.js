import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./lib/db.js";
import ticketRoutes from "./routes/tickets.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Api is working')
});

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', authRoutes);


const PORT =process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log("Server is running: "+PORT);
    connectDB();
})
