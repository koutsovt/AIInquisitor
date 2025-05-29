import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useNotification } from './NotificationContext';

interface User {
  email: string;
  name?: string;
  provider: 'email';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AUTHORIZED_EMAILS = [
  'koutsovt@gmail.com',
  'koutsovt@yahoo.com',
  'andrew@elrigsaa.com.au',
  'brian@jardongroup.com.au'
];

export const providers = [
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'bg-green-600 hover:bg-green-700 text-white',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('user'));
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const validateUser = (email: string): boolean => {
    return AUTHORIZED_EMAILS.includes(email.toLowerCase());
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!validateUser(email)) {
        throw new Error('Unauthorized email address');
      }

      const newUser = {
        email,
        provider: 'email' as const,
      };

      setUser(newUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Failed to sign in') };
    }
  };

  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};