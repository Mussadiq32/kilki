
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import CustomButton from '@/components/ui/CustomButton';
import { Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please ensure both passwords are the same.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Sign up
        const { error } = await signUp(formData.email, formData.password, {
          name: formData.name,
          phone: formData.phone,
        });
        
        if (error) throw error;
        
        toast({
          title: "Registration successful!",
          description: "Please check your email to confirm your account.",
          variant: "default",
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
        
        // Switch to sign in
        setIsSignUp(false);
      } else {
        // Sign in
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
          variant: "default",
        });
        
        // Redirect to home page
        navigate('/');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-royal-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img 
            src="https://iili.io/2mPx3rP.png" 
            alt="Royal Group of Real Estates Logo" 
            className="h-16 mx-auto mb-4" 
          />
          <h2 className="heading-lg text-royal-800">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-royal-600 mt-2">
            {isSignUp 
              ? 'Join Royal Group of Real Estates to explore premium properties' 
              : 'Sign in to access your account and saved properties'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-royal-700 mb-2">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required={isSignUp}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-royal-700 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>
          
          {isSignUp && (
            <div>
              <label htmlFor="phone" className="block text-royal-700 mb-2">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="+91 7006064587"
              />
            </div>
          )}
          
          <div className="relative">
            <label htmlFor="password" className="block text-royal-700 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-royal-700 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required={isSignUp}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <CustomButton
            type="submit"
            className="w-full"
            icon={isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : isSignUp
                ? 'Create Account'
                : 'Sign In'
            }
          </CustomButton>
        </form>
        
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gold-600 hover:text-gold-700 font-medium transition-colors duration-300"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : 'Need an account? Sign Up'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
