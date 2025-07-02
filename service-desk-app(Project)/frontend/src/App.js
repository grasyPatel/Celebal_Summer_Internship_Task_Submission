import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; 
import TicketsPage from './pages/TicketsPage';
import AdminTicketsPage from './pages/AdminTicketsPage';
import AdminRoute from './components/AdminRoute';


const App = () => {
  return (
  
     
     <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tickets" element={<TicketsPage />} />
    
   
    <Route
      path="/admin/tickets"
      element={
        <AdminRoute>
          <AdminTicketsPage />
        </AdminRoute>
      }
    />
  </Routes>
</Router>

  
  )
}

export default App