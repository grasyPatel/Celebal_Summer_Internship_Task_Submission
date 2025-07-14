import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

import dotenv from "dotenv";

dotenv.config();
const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_key: process.env.CLOUDINARY_API_KEY,
    cloud_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload =multer({storage })


router.post("/", upload.single("image"), async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }
        const streamUpoad =(fileBuffer)=>{
            return new Promise((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream((error, result)=>{
                    if(result){
                        resolve(result);
                    }
                    else{
                        reject(error);
                    }
                });
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
               
        } 
        const result = await streamUpoad(req.file.buffer);
        res.json({imageUrl:result.secure_url});
     
        

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
})

export default router;






