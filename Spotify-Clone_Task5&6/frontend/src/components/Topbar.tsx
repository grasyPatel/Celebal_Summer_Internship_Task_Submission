import { SignOutButton, useAuth } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons';

const Topbar = () => {
  const isAdmin = false;
  const { isSignedIn } = useAuth();

  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex items-center gap-2'>MP3</div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link to={"/admin"} className='flex items-center gap-1'>
            <LayoutDashboardIcon className='h-4 w-4' />
            Admin Dashboard
          </Link>
        )}

        {isSignedIn ? (
          <SignOutButton />
        ) : (
          <SignInOAuthButtons />
        )}
      </div>
    </div>
  );
};

export default Topbar;
