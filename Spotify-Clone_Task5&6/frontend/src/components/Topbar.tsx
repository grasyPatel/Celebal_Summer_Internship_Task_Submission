import { useAuth, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInOAuthButtons from "./SignInOAuthButtons"

import { useAuthStore } from '../stores/useAuthStore';

const Topbar = () => {
  const {isAdmin} =useAuthStore();
  const {isSignedIn}=useAuth();
  
  console.log({isAdmin});
 

  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex items-center gap-1'>
        <img src='/logo.png' alt='logo' className='size-10'/>
        
        MP3</div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link to={"/admin"} className='flex items-center gap-1 bg-black text-white px-3 py-2 rounded-md hover:bg-zinc-800 transition'>
            <LayoutDashboardIcon className='h-4 w-4' />
            Admin Dashboard
          </Link>
        )}
       {!isSignedIn && <SignInOAuthButtons />}

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
