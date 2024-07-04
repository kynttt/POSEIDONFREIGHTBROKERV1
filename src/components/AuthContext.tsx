import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    isAdmin: boolean;
    checkAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState ? JSON.parse(savedAuthState) : false;
    });

    const [isAdmin, setIsAdmin] = useState<boolean>(false); // Initialize isAdmin state

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const login = () => {
        setIsAuthenticated(true);
        // On login, asynchronously check and set isAdmin status
        checkAdminStatus().then((isAdmin) => {
            setIsAdmin(isAdmin);
        });
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        setIsAdmin(false); // Reset isAdmin state on logout
    };

    const checkAdminStatus = async () => {
        try {
            const response = await fetch('/api/users/isAdmin', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch isAdmin status');
            }

            const data = await response.json();
            return data.isAdmin;
        } catch (error) {
            console.error('Error fetching isAdmin status:', error);
            return false; // Default to false if unable to fetch
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, checkAdminStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
