import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SidebarLayout from '../components/SidebarLayout';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <SidebarLayout>
      {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </SidebarLayout>
  );
};

export default Dashboard;
