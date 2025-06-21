import User from "../models/user.model.js";

export const getAllUsers = async(req,res) =>{
    try{
        const currentUserId=req.auth.userId;
        const users=await User.find({clerkId:{$ne:currentUserId}});
        return res.status(200).json({users})


    }catch(error){
        console.log("error in feaching users"+error);
        return res.status(500).json(error.message);
    
        

    }

}