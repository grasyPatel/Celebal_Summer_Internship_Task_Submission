import Song from "../models/song.model.js";

import album from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary=async(file)=>{
    try{
        const result =await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto",


        })
        return result.secure_url;
    }catch(error){
        console.log("Error"+error);
        return null;

    }

}



export const createSong=async(req,res)=>{
    try{
        if(req.files || req.file.audioFile || !req.files.imageFile){
            return res.status(400).json({message:"Please uploadd the file"});
        }
        const {title, artist,albumId, duration}=req.body
        const {audioFile}=req.files.audioFile;
        const {imageFile}=req.files.imageFile;
        const  audioUrl =await uploadToCloudinary(audioFile);
        const imageUrl=await uploadToCloudinary(imageFile);

        const song=new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId:albumId || null


        })
        await song.save()

        if(albumId){
            await album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            })


        }
        return res.status(200).json({message:"Song created successfully"})
            

        


    }catch(error){
        console.log("Error"+error);
        return res.status(500).json({message:"Internal server error"})
        

    }


        
    
}

export const deleteSong=async(req,res)=>{
    try{
        const {id}=req.params;
        const song=await Song.findById(id);
        if(song.albumId){
            await album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            })
        }
        await Song.findByIdAndDelete(id);
        return res.status(200).json({message:"Song deleted successfully"})


    }catch(error){

            console.log("Error"+error);
            return res.status(500).json({message:"Internal server error"})

    }   
   


}

export const createAlbum=async(req,res)=>{
    try{
        const {title, artist, releaseYear}=req.body;
        const {imageFile}=req.files;
        const imageUrl=await uploadToCloudinary(imageFile);
        const album=new album({
            title,
            artist,
            releaseYear,
            imageUrl
        })
        await album.save();
        return res.status(200).json({message:"Album created successfully"})



    }
    catch(error){
        console.log("Error"+error);
        return res.status(500).json({message:"Internal server error"})


    }



}

export const deletealbum=async(req,res)=>{
    try{
        const {id}=req.params;
        const album=await album.findById(id);
        await album.remove();
        return res.status(200).json({message:"Album deleted successfully"})


    }catch(error){ 
        console.log("Error in deleting album"+error);
        return res.status(500).json({message:"Internal server error"})

    }
    


}

export const checkAdmin=async(req,res)=>{
    res.status(200).json({admin:true});
}    

