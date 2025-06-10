import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'agent';
  name?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  refreshSession: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  refreshSession: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (userEmail: string) => {
    // Check if the user's email is the admin email
    const isAdminUser = userEmail === 'info@royalgroupofrealestates.com';
    setIsAdmin(isAdminUser);
    return isAdminUser;
  };

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Error refreshing session:', error);
        // If refresh fails, sign out the user
        await signOut();
        return { error };
      }
      
      if (data?.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email as string,
          role: (data.user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
          name: data.user.user_metadata?.name,
          phone: data.user.user_metadata?.phone,
        };
        
        setUser(userData);
        await checkAdminStatus(userData.email);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error in refreshSession:', error);
      return { error };
    }
  };

  useEffect(() => {
    // Check for user on mount
    const getUser = async () => {
      setIsLoading(true);
      
      try {
        // First try to get the current user
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error getting user:', error);
          
          // If it's a JWT expired error, try to refresh the session
          if (error.message?.includes('JWT') || error.message?.includes('expired')) {
            console.log('JWT expired, attempting to refresh session...');
            const { error: refreshError } = await refreshSession();
            
            if (refreshError) {
              console.error('Failed to refresh session:', refreshError);
              setUser(null);
              setIsAdmin(false);
            }
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } else if (user) {
          const userData = {
            id: user.id,
            email: user.email as string,
            role: (user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
            name: user.user_metadata?.name,
            phone: user.user_metadata?.phone,
          };
          
          setUser(userData);
          await checkAdminStatus(userData.email);
        }
      } catch (error) {
        console.error('Error in getUser:', error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const user = session.user;
          const userData = {
            id: user.id,
            email: user.email as string,
            role: (user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
            name: user.user_metadata?.name,
            phone: user.user_metadata?.phone,
          };
          
          setUser(userData);
          await checkAdminStatus(userData.email);
        } else if (['SIGNED_OUT', 'USER_DELETED', 'TOKEN_REFRESHED'].includes(event)) {
          if (event === 'TOKEN_REFRESHED' && session?.user) {
            // Handle token refresh
            const user = session.user;
            const userData = {
              id: user.id,
              email: user.email as string,
              role: (user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
              name: user.user_metadata?.name,
              phone: user.user_metadata?.phone,
            };
            
            setUser(userData);
            await checkAdminStatus(userData.email);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        }
      }
    );

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error && data?.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email as string,
        role: (data.user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
        name: data.user.user_metadata?.name,
        phone: data.user.user_metadata?.phone,
      };
      
      setUser(userData);
      await checkAdminStatus(userData.email);
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          phone: userData.phone,
          role: 'user', // Default role for new users
        },
      },
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setIsAdmin(false);
    }
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin,
        signIn,
        signUp,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
