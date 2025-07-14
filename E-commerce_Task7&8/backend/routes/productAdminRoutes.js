import express from "express";
import Prodcut from "../models/Product.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();


// get /api/admin/products
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Prodcut.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})


export default router;