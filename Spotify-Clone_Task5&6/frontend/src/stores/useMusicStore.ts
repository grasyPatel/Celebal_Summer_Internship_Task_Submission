import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {Song, Album} from "../types/index";


interface MusicStoreState {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum:Album|null
  fetchAlbums: () => Promise<void>;

  fetchAlbumById:(id:string)=>Promise<void>;
}

export const useMusicStore = create<MusicStoreState>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum:null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch albums" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async(id:string)=>{
    set({
      isLoading:true,error:null
    })
    try{
      const response=await axiosInstance.get(`/album/${id}`);
      set({currentAlbum:response.data})

    }catch(error:any){
      set({error:error.response.data.message})

    }finally{
      set({isLoading:false})
    }

  }
}));
