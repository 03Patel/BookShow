import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialState = localStorage.getItem("user");

    const [authUser, setAuthUser] = useState(
        initialState ? JSON.parse(initialState) : null
    );

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);