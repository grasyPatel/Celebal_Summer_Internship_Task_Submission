import React from 'react'
import FormPage from './components/FormPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
      

      </Routes>

    </Router>
   
  )
}

export default App