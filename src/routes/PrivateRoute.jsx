// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Or use AuthContext

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;