import React, { useState } from 'react';
import { useAuth, providers } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Button from '../components/Button';
import { Loader, Mail } from 'lucide-react';
import Logo from '../components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { showNotification } = useNotification();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showNotification('Please enter both email and password', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        showNotification(error.message, 'error');
      } else {
        showNotification('Login successful!', 'success');
      }
    } catch (error) {
      showNotification('An error occurred during login', 'error');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-6 py-8 text-white">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-center opacity-90 mt-2">Sign in to access your documents</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" disabled={isLoading} fullWidth>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Sign In with Email
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;