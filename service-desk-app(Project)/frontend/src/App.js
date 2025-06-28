import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; 
import ThemeToggle from './components/ThemeToggle'
import TicketsPage from './pages/TicketsPage';


const App = () => {
  return (
  
     
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<TicketsPage />} />
      </Routes>
    </Router>
  
  )
}

export default App