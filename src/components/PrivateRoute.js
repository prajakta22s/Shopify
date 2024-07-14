import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  console.log('PrivateRoute user:', user); // Debugging log
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
