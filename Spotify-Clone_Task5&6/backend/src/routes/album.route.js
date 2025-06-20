import { Router } from "express";

const router = Router();

router.get("/",(req, res)=>{
    console.log("hit user route")
    res.send("User route with get method");
})

export default router;