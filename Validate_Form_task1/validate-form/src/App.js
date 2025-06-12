import React from 'react'
import FormPage from './components/FormPage';
import SuccessPage from './components/SuccessPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

    </Router>
   
  )
}

export default App