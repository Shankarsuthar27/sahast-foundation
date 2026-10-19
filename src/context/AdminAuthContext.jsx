import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  authenticateMasterAdmin,
  getAdminSession,
  logoutAdmin
} from '../firebase/services';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check initial session
    const existing = getAdminSession();
    if (existing) {
      setUser(existing);
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const authenticatedUser = await authenticateMasterAdmin(usernameOrEmail, password);
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    authError,
    isAuthenticated: Boolean(user),
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
