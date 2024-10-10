import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({ isAuthenticated: false });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthContext.Provider value={{ isAuthenticated: true }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);