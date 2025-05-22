import React from 'react'
import FormPage from './components/FormPage';
import OutPutPage from './components/OutputPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/output" element={<OutPutPage />} />

      </Routes>

    </Router>
   
  )
}

export default App