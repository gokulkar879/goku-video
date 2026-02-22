import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession } from "aws-amplify/auth";
import type { AuthSession } from "aws-amplify/auth";
import type { ReactNode } from 'react';

// Create the AuthContext
const AuthContext = createContext<any>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthSession | null>(null);

  // Initialize auth state
  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await fetchAuthSession();
        console.log("user logged in");
        setUser(session);
      } catch (e) {
        console.log(e);
      }

    }
    checkAuth();
    // TODO: Check for stored session
    
  }, []);

  const value = {
    user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
}