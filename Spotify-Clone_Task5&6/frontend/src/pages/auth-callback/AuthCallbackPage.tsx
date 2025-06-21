import { useUser} from '@clerk/clerk-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Loader } from 'lucide-react';
import { useEffect , useRef} from 'react';
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  const {isLoaded, user}=useUser();
  const navigate=useNavigate();
  const syncAttempted=useRef(false);



   useEffect(()=>{
    const syncUser=async()=>{
      try{
        if(!isLoaded || !user || syncAttempted.current) return;

        syncAttempted.current=true;
        await axiosInstance.post("/auth/callback",{
          id:user.id,
          firstName:user.firstName,
          lastName:user.lastName,
          imageUrl:user.imageUrl,
          


        })
       

      }catch(error){
        console.log(error);

      }
      finally{
        navigate("/",);
      }
    };
    syncUser();
      
   },[isLoaded, user,navigate])

  return (
    <div className='h-screen w-full flex justify-center items-center bg-black'>
      <Card className='shadow-2xl border-0 bg-gray-800/50 backdrop-blur-sm pl-28 pr-28 pt-4 pb-4'>
        <CardContent className='flex flex-col justify-center items-center p-8 space-y-4'>
          <div className='relative'>
            <Loader className='size-8 animate-spin text-emerald-400 drop-shadow-lg'></Loader>
            <div className='absolute inset-0 size-8 animate-ping rounded-full bg-emerald-400/20'></div>
          </div>
          <div className='text-center space-y-2'>
            <h3 className='text-xl font-semibold text-white'>Logging you in</h3>
            <p className='text-gray-300 text-sm animate-pulse'>Redirecting<span className='inline-block w-3 text-left'>...</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallbackPage