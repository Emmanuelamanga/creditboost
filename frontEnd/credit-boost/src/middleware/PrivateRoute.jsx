import React, { useEffect, useContext, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { AppContext } from '@/context/AppContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !authService.getToken()) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.verifyToken();
        setIsVerifying(false);
      } catch {
        setIsVerifying(false);
      }
    };

    if (authService.getToken()) {
      verify();
    } else {
      setIsVerifying(false);
    }
  }, []);

  if (isVerifying) {
    return (<div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>);
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export default PrivateRoute;
