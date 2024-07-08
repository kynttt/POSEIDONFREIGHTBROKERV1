import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface PrivateRouteProps {
  element: React.ReactElement;
  roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles, ...rest }) => {
    const { isAuthenticated, role } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    if (!roles.includes(role || '')) {
      return <Navigate to="/" />;
    }
  
    return React.cloneElement(element, rest);
  };
  
  

export default PrivateRoute;
