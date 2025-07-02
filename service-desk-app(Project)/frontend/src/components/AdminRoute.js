
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL?.toLowerCase();

  if (loading) return <div>Loading...</div>;

  if (!user || user.email.toLowerCase() !== adminEmail) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default AdminRoute;
