import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/authenticate/login/Login';
import Signup from './pages/authenticate/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import ForgetPass from './pages/authenticate/ForgetPass/ForgetPass'
import FrontPage from './pages/front page/FrontPage';
import ResetPassword from './pages/Reset Pass/reset';
import ActivateAccount from './pages/authenticate/activate/activate';
import Reset from './pages/Reset Pass/reset';
import './App.css'; // Import CSS file for global styles

function App() {
  return (
    <div> 
      <div className="page-container">
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<FrontPage />} />
          <Route path ="/forgetpass" element = {<ForgetPass />} />
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/register/:token" element={<ActivateAccount />} /> 
          <Route path="/reset/:token" element={<Reset />} />
        </Routes>
      </div>
      </div>
  );
}

export default App;
