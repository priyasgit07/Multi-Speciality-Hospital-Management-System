import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hospital_user');
    const token = localStorage.getItem('hospital_token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('hospital_user');
        localStorage.removeItem('hospital_token');
      }
    }
    setLoading(false);

    // Listen for session expiration events from api interceptor
    const handleAuthExpired = () => {
      setUser(null);
    };
    window.addEventListener('hospital_auth_expired', handleAuthExpired);
    return () => window.removeEventListener('hospital_auth_expired', handleAuthExpired);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role.toLowerCase(),
        avatar: data.avatar,
        specialization: data.specialization,
        departmentId: data.departmentId
      };
      localStorage.setItem('hospital_token', data.token);
      localStorage.setItem('hospital_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
    localStorage.removeItem('hospital_token');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}