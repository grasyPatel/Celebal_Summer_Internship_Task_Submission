import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getstats } from "../controller/stats.controller.js";
    


const router = Router();

router.get("/",protectRoute, requireAdmin,getstats);

export default router;