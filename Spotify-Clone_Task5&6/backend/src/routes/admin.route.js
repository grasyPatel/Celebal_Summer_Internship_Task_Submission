import { Router } from "express";
import {createSong, deleteSong,createAlbum,deletealbum, checkAdmin} from "../controller/admin.controller.js";
import {protectRoute,requireAdmin} from "../middleware/auth.middleware.js"


const router = Router();
router.get("/check", protectRoute,requireAdmin,checkAdmin);

router.post("/songs",protectRoute,requireAdmin,createSong)
router.delete("/songs/:id",protectRoute,requireAdmin, deleteSong)
router.post("/albums",protectRoute,requireAdmin,createAlbum)
router.delete("/albums/:id",protectRoute,requireAdmin, deletealbum)

export default router;