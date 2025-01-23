import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('admin_data'));
        if (storedData) {
            setToken(storedData.token);
            setAdminData(storedData.admin);
            setIsAuthenticated(true);
        }
    }, []);
    
    const login = (newToken, newData) => {
        localStorage.setItem("admin_data", JSON.stringify({ token: newToken, admin: newData }));
        setToken(newToken);
        setAdminData(newData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('admin_data');
        setToken(null);
        setAdminData(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, adminData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
