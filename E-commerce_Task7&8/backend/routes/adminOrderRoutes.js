import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// get /api/admin/orders
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


//put /api/admin/orders/:id
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status=req.body.status||order.status;
            order.isDelivered=req.body.isDelivered==="Delivered"?true:order.isDelivered;
            order.deliveredAt=req.body.isDelivered==="Delivered"?Date.now():order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }     
});


//delete /api/admin/orders/:id
router.delete("/:id", protect, admin, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order deleted successfully"});
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})




export default router;

