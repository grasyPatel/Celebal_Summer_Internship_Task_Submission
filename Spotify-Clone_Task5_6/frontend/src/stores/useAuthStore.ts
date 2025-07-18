

import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthStore{
    isAdmin: boolean;
    isLoading :boolean;
    error:string | null;
    checkAdminStatus:()=>Promise<void>;
    reset:()=>void;



}
export const useAuthStore=create<AuthStore>((set)=>({
    isAdmin:false,
    isLoading:false,
    error:null,
    checkAdminStatus:async()=>{
        set({isLoading:true, error:null})
        try{
            const response=await axiosInstance.get("/admin/check");
            console.log("checkAdminStatus response:", response.data);
            set({isAdmin:response.data.isAdmin})

        }catch(error:any){
            set({isAdmin:false, error:error.response.data.message})


        }finally{
            set({isLoading:false})
        }


    },
    reset:()=>{
        set({isAdmin:false,isLoading:false,error:null})

    }
}))

