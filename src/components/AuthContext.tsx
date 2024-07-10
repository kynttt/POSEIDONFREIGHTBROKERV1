import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    user: {
        id: string;
        role: string;
        // other properties as needed
    };
    // other top-level JWT properties as needed
}

export interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
    checkUserRole: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); // Export AuthContext

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState ? JSON.parse(savedAuthState) : false;
    });

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            checkUserRole().then((userRole) => {
                setRole(userRole);
            });
        } else {
            setRole(null);
        }
    }, [isAuthenticated]);

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        checkUserRole().then((userRole) => {
            setRole(userRole);
        });
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('accessToken');
        setRole(null);
    };

    const checkUserRole = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Access token not found');
            }

            const decodedToken = jwtDecode(token) as DecodedToken;

            if (!decodedToken || !decodedToken.user || !decodedToken.user.role) {   
                throw new Error('User role not found in token');
            }

            console.log('Decoded token:', decodedToken);

            return decodedToken.user.role;
        } catch (error) {
            console.error('Error fetching user role:', error);
            return null; // Handle error case gracefully
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, checkUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};
