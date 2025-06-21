import album from "../models/album.model.js";



export const getAllAlbums=async(req,res)=>{
    try{
        const albums=await album.find();
        res.status(200).json(albums);

    }catch(error){
        console.error("Error in getting all albums: "+error);
        return res.status(500).json({error:'Internal Server Error'});  

    }
}

export const getAlbumById=async(req,res)=>{
    try{
        const {albumId}=req.params;
        const album=await Album.findById(albumId).populate('songs');
        if(!album){
            return res.status(404).json({error:'Album not found'});
        }
        res.status(200).json(album);




    }catch(error){
        console.error("Error in getting album by id: "+error);  
        return res.status(500).json({error:'Internal Server Error'});
    
        
    }
     


}