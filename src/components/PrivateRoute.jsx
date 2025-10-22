import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // If user is authenticated, show the protected content
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login with return url
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;