import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [token, userId, role]);

  const login = ({ token, userId, role }) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
