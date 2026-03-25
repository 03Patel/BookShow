import React, { createContext, useContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider with isFree
export const AuthProvider = ({ children }) => {
    // Get initial user from localStorage
    const initialUser = localStorage.getItem("user");
    const [authUser, setAuthUser] = useState(initialUser ? JSON.parse(initialUser) : null);

    // Optional: set initial isFree (default false)
    const [isFree, setIsFree] = useState(false);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isFree, setIsFree }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);