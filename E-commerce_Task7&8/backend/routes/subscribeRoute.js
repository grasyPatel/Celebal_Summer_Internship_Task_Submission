import express from "express";

import Subscriber from "../models/Subscriber.js";
const router = express.Router();



// post /api/subscribe
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    try{
        const subscriber = await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"Email already subscribed"});
        }
        const newSubscriber = new Subscriber({email});
        await newSubscriber.save();
        res.status(201).json({message:"Subscribed successfully"});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
        
    }

})

export default router;

