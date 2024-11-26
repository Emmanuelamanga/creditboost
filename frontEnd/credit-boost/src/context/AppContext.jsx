import { authService } from '@/services/auth.service';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const USER_KEY = "user_data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getToken());

  useEffect(() => {
    const verifyAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          await authService.verifyToken();
          if (!user) {
            // const userData = await authService.getCurrentUser();
            // setUser(userData);
            // localStorage.setItem('user_data', JSON.stringify(userData));
          }
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.clear();
        }
      }
    };

    verifyAuth();
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const logout = async () => {
    try {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    updateUser,
    logout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};