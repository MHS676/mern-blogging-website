// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize authentication state from localStorage
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/signin', { email, password });
      const { access_token, ...user } = response.data;

      // Save tokens and user info to localStorage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update auth state
      setAuth({ accessToken: access_token, user });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed.' };
    }
  };

  // Logout function
  const logout = () => {
    // Remove tokens and user info from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Reset auth state
    setAuth({ accessToken: null, user: null });

    // Redirect to login page
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
