import express from "expres";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));


app.use(express.json)
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}))

const PORT=8080 || process.env.PORT;


app.listen(PORT,()=>{
    console.log("Server is running on port:"+PORT);
})

