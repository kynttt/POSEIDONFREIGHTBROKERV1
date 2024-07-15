import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/useAuthStore';

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length > 0 && !roles.includes(role || '')) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
