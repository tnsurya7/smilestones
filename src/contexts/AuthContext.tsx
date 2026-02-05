'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      // Check if user is stored in localStorage
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(emailOrUsername: string, password: string) {
    // Check against environment variables (required)
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      throw new Error('Admin credentials not configured. Please check environment variables.');
    }

    if (emailOrUsername === adminUsername && password === adminPassword) {
      // Mock user for testing
      const mockUser: User = {
        id: '1',
        name: 'Super Admin',
        username: adminUsername,
        role: 'super_admin',
        created_at: new Date().toISOString(),
      };
      
      // Save to state and localStorage
      setUser(mockUser);
      localStorage.setItem('admin_user', JSON.stringify(mockUser));
      return;
    }

    throw new Error('Invalid credentials');
  }

  async function signOut() {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem('admin_user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
