import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

interface ChatStore{
    users:any[];
    fetchUsers:()=>Promise<void>;
    isLoading:boolean;
    error:string|null;

}
export const useChatStore=create<ChatStore>((set)=>({
    users:[],
    isLoading:false,
    error:null,
    fetchUsers:async()=>{
        set({isLoading:true,error:null})
        try{
            const response=await axiosInstance.get('/users');
            console.log("Fetched users:", response.data);

            const usersData = Array.isArray(response.data.users) ? response.data.users : [];

            set({users:usersData})
        }catch(error:any){
            set({error:error.response.data.message})
        }finally{
            set({isLoading:false})  
        }                 
      

       
    }    
            
}))