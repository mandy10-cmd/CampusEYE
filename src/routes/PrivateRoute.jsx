// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;