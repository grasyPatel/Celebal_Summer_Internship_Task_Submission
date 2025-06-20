import { clerkClient } from "@clerk/express";

export const protectRoute =async(req,res,next)=>{
    if(!req.auth.userId){
        res.status(401).json({message:"Unauthorized-you must be logged in to view this page"})
        
    }
    next(); 
    
    };

    export const requiredAdmin=async(req,res,next)=>{
        try{
            const currentUser=await clerkClient.users.getUser(req.auth.userId);
            const isAdmin=process.env.ADMIN_EMAIL===currentUser.primaryEmailAddress?.emailAddress;
            if(!isAdmin){
                return res.status(403).json({message:"unathorized-you are not authorized to view this page"})
            }
            next();


            
        }catch(error){

        }
    }

    
    