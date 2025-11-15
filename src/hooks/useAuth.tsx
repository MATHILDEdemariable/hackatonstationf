import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

// Mock user for demo mode (using fixed UUID for consistency)
const MOCK_USER: User = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'demo@athlete.com',
  app_metadata: {},
  user_metadata: { user_type: 'athlete' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

const MOCK_SESSION: Session = {
  user: MOCK_USER,
  access_token: 'mock-token',
  refresh_token: 'mock-refresh',
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  token_type: 'bearer',
} as Session;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, userType: 'athlete' | 'club') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Demo mode: Always use mock user
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [session, setSession] = useState<Session | null>(MOCK_SESSION);
  const [loading, setLoading] = useState(false);
  const isDemoMode = true;
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-login with mock user for demo
    setUser(MOCK_USER);
    setSession(MOCK_SESSION);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userType: 'athlete' | 'club') => {
    // Mock signup for demo
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin for demo
    return { error: null };
  };

  const signOut = async () => {
    // Do nothing in demo mode
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading, isDemoMode }}>
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
