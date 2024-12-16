import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import SupersetDashboard from './Components/dashboard';

const App = () => {
  return (
    <Router>
      <div>
      
        <Routes>
    
          <Route path="/login" element={<Login />} /> 

        
          <Route 
            path="/dashboard" 
            element={
              localStorage.getItem('token') ? 
                <SupersetDashboard src='https://mypartnershipview.mtn.ng/superset/dashboard/p/R3EPObbbKBD/' /> : 
                <p>Please log in first.</p>
            } 
          />

          <Route path="/" element={<p>Please log in first.</p>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
