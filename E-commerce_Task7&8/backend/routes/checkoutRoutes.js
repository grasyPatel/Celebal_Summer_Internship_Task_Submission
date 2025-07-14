import express from 'express';

import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { protect  } from '../middleware/authMiddleware.js'; 
import Checkout from  '../models/Checkout.js';
 
const router = express.Router();
 //Post /api/checkout
 router.post("/", protect, async (req, res) => {
    
        const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
        if(!checkoutItems || checkoutItems.length === 0) {
            return res.status(400).json({ message: "No checkout items provided" });
        
        }
        try{
            const checkout = new Checkout({
                user: req.user._id,
                checkoutItems: checkoutItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
                paymentStatus: 'pending',
                isPaid: false,
              
            });
             
            console.log(`chekout created for use${req.user._id}`)
            res.status(201).json(checkout);

        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Server Error" });

        }
       


   
})


//put /api/checkout/:id/pay
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        if(paymentStatus==='paid'){
            checkout.isPaid = true;
            checkout.paidAt = Date.now();
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            await checkout.save();
            res.status(200).json(checkout);

        }
        else{
            res.status(400).json({message:"Invalid payment status"});
        }
        
    } catch (err) {
     console.log(err);
     res.status(500).json({ message: "Server Error" });
    }
}); 


// post /api/checkout/:id/finalize
router.post("/:id/finalize", protect, async (req, res) => {
    try{
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder=await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                isDelivered:false,
                paidAt:checkout.paidAt,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails
            });
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({user:checkout.user});
            res.status(200).json(finalOrder);




                
        }else if(checkout.isFinalized){
            res.status(400).json({message:"Checkout already finalized"});
        }   
        else{
            res.status(400).json({message:"Checkout not paid or already finalized"});
        }
       

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }


})

export default router;