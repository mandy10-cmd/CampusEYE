import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TrinetraLanding from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import BehaviorDashboard from './pages/BehaviorDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TrinetraLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Dashboard" element={<BehaviorDashboard />} />
    </Routes>
  );
}

export default App;