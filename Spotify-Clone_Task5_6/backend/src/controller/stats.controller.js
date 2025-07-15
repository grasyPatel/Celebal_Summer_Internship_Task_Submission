import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";


export const getstats=async(req,res)=>{
    try{
       const [totalSongs,totalAlbums, totalUsers, uniqueArtists ]=await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(), 
        
        Song.aggregate([
            {
                $unionWith:{
                    coll:"albums",
                    pipeline:[],
                }


            },
            {
                $group:{
                    _id:"$artist",
                    
                }
            },

            {
                $count:"count",
        
                

            }
        ]) 
        
    ]);
   
    res.status(200).json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists:uniqueArtists[0]?.count||0
    })




    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error",err });

    }

}  ; 