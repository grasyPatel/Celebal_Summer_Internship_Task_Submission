import { useAuth } from "@clerk/clerk-react";
import { Loader } from 'lucide-react';
import { useState, useEffect} from "react";
import { axiosInstance } from "../lib/axios";


const updateApitoken=(token:string|null)=>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization']=`Bearer ${token}`;
        
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }    
}



function AuthProvider({children}:{children:React.ReactNode}) {
    const {getToken}=useAuth();
    const [loading, setLoadings]=useState(true);

    useEffect(()=>{
        const initAuth=async()=>{
            try{
                const token=await getToken();
                updateApitoken(token);
                
            

            }
            catch(error){
                console.log("error in auth provider"+error);
            }
            finally{
                setLoadings(false);
            }

        };
        initAuth();

    },[getToken]) ;
    
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