import { authService } from '@/services/auth.service';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        try {
            const cached = localStorage.getItem('user_data');
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!authService.getToken();
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = authService.getToken();
                
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                // First verify the token
                const isValid = await authService.verifyToken();
                
                if (!isValid) {
                    throw new Error('Invalid token');
                }

                // Then get fresh user data
                const userData = await authService.getCurrentUser();
                setUser(userData);
                setIsAuthenticated(true);
                
            } catch (error) {
                console.error("Auth initialization failed:", error);
                // Clean up on auth errors
                authService.logout();
                setUser(null);
                setIsAuthenticated(false);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [navigate]);

    // Logout helper
    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    // Update user helper
    const updateUser = async (newData) => {
        try {
            if (!Object.keys(newData).length) return;

            const updatedUser = await authService.updateUserData(newData);
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            if (error.message.includes('token')) {
                logout();
            }
            throw error;
        }
    };

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        updateUser,
        logout,
        isLoading
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};