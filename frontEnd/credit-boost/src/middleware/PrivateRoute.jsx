import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api from '../api/privateInstance';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated,setIsAuthenticated } = useContext(AppContext);

  const verifyUserSession = async () => {
    const response = await api.post('jwt/verify/');
    return response.data;
  };

  //check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyUserSession();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
