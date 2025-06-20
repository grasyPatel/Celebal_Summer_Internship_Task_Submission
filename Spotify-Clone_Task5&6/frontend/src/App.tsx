import React from 'react';
import Button from '@mui/material/Button';
import {
  useUser,
  SignInButton,
  UserButton
} from '@clerk/clerk-react';

const App: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <header>
      {!isSignedIn ? (
        <>
        <SignInButton>
          <Button variant='contained' color='primary'>Sign In</Button>
        </SignInButton>
   
  </>
      ) : (
        <UserButton />
      )}
    </header>
  );
};

export default App;
