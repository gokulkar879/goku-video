import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import type { AuthSession } from "aws-amplify/auth";
import type { ReactNode } from 'react';

// Create the AuthContext
const AuthContext = createContext<any>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await fetchAuthSession();
        console.log(session);
        if(session.tokens == null) {
          throw new Error('The user is not logged in');
        }
        setUser(session);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }

    }

    checkAuth();
    // TODO: Check for stored session
    
  }, []);

  const value = {
    user,
    setUser,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
}