'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';
import axios from '@/lib/axios'; // Make sure axios baseURL is set here

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user and token from localStorage on app start
    const storedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('authToken');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('Error parsing stored user', err);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { _id, name, role, token } = res.data;

      const loggedInUser: User = {
        id: _id,
        name,
        email, // backend doesn't return email, so use input
        role,
      };

      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(loggedInUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      const { _id, name: returnedName, role, token } = res.data;

      const newUser: User = {
        id: _id,
        name: returnedName,
        email,
        role,
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
