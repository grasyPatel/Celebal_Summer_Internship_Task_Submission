import { useAuth } from "@clerk/clerk-react";
import { Loader } from 'lucide-react';
import { useState, useEffect} from "react";
import { axiosInstance } from "../lib/axios";
import  {useAuthStore}  from "../stores/useAuthStore";


const updateApitoken=(token:string|null)=>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization']=`Bearer ${token}`;
        
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }    
}



const AuthProvider=({children}:{children:React.ReactNode})=> {
    const {getToken}=useAuth();
    const [loading, setLoadings]=useState(true);
    const { checkAdminStatus}=useAuthStore();

    useEffect(()=>{
        const initAuth=async()=>{
            try{
                const token=await getToken();
                updateApitoken(token);
                if(token){
                    await checkAdminStatus();

                }
                
            

            }
            catch(error){
                updateApitoken(null);
                console.log("error in auth provider"+error);
            }
            finally{
                setLoadings(false);
            }

        };
        initAuth();

    },[getToken, checkAdminStatus]) ;
    
    if(loading){
        return (
        <div className="h-screen flex justify-center items-center">

           <Loader className=" size-8 animate-spin text-emerald-500" />

        </div>
        );
    }

  return (
    <div>{children}</div>
  )
}

export default AuthProvider