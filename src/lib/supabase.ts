import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anonymous Key is missing. Please check your environment variables.');
}

// Ensure we always provide fallback values to prevent crashes on missing env vars
export const supabase = createClient(
  supabaseUrl || 'https://xnlhyrcjockhwtrjnpgq.supabase.co', 
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGh5cmNqb2NraHd0cmpucGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTM4MDMsImV4cCI6MjA1NjM4OTgwM30.ZTATa439TOlSHBeq6UH5WZ-I23ueuECnBH_Er2Y9iio',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Set up global error handling for JWT expiration
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed automatically');
  }
});

// Utility function to handle JWT expiration errors
export const handleJWTError = async (error: any, refreshSession: () => Promise<{ error: any }>) => {
  if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
    console.log('JWT expired, attempting to refresh session...');
    const { error: refreshError } = await refreshSession();
    
    if (refreshError) {
      console.error('Failed to refresh session:', refreshError);
      throw new Error('Session expired. Please sign in again.');
    }
    
    return true; // Session was refreshed successfully
  }
  return false; // Not a JWT error
};

// Authentication helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const refreshSession = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  return { data, error };
};

// Database helper functions
export const createContactMessage = async (messageData: any) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData]);
  return { data, error };
};

export const savePropertyToFavorites = async (userId: string, propertyId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, property_id: propertyId }]);
  return { data, error };
};

export const removePropertyFromFavorites = async (userId: string, propertyId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, property_id: propertyId });
  return { data, error };
};

export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);
  return { data, error };
};

// Property search helper function
export const searchProperties = async (
  query?: string,
  location?: string,
  minPrice?: number,
  maxPrice?: number,
  type?: 'residential' | 'commercial' | 'all',
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular',
  limit?: number
) => {
  try {
    console.log("Calling searchProperties with params:", { query, location, minPrice, maxPrice, type, sort, limit });
    
    // Build parameters object
    const params: Record<string, string> = {};
    
    if (query) params.query = query;
    if (location) params.location = location;
    if (minPrice !== undefined) params.minPrice = minPrice.toString();
    if (maxPrice !== undefined) params.maxPrice = maxPrice.toString();
    if (type) params.type = type;
    if (sort) params.sort = sort;
    if (limit) params.limit = limit.toString();
    
    // Use the edge function for searching properties
    const { data, error } = await supabase.functions.invoke('search-properties', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        params
      }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw error;
    }
    
    console.log("Search results:", data);
    return data;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

// Get search suggestions for auto-complete
export const getSearchSuggestions = async (query: string) => {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    console.log("Getting suggestions for:", query);
    
    const { data, error } = await supabase.functions.invoke('search-properties', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        params: {
          query,
          autoSuggest: 'true'
        }
      }
    });
    
    if (error) {
      console.error("Error fetching suggestions:", error);
      throw error;
    }
    
    // Check if data.suggestions exists and is an array, otherwise return empty array
    if (data && data.suggestions && Array.isArray(data.suggestions)) {
      console.log("Suggestions received:", data.suggestions);
      return data.suggestions;
    } else {
      console.error("Invalid suggestions format received:", data);
      return [];
    }
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
};

// Get properties helper function with improved filters
export const getProperties = async (filters: any = {}) => {
  let query = supabase.from('properties').select('*');
  
  // Apply filters if they exist
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  
  if (filters.location) {
    query = query.eq('location', filters.location);
  }
  
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  const { data, error } = await query;
  return { data, error };
};

// Mortgage calculator helper function
export const saveMortgageCalculation = async (userId: string, mortgageData: any) => {
  const { data, error } = await supabase
    .from('mortgage_calculator')
    .insert([{ user_id: userId, ...mortgageData }]);
  return { data, error };
};

// Property Management functions
export const createProperty = async (propertyData: any) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData]);
  return { data, error };
};

export const updateProperty = async (id: string, propertyData: any) => {
  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', id);
  return { data, error };
};

export const deleteProperty = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  return { data, error };
};

export const getAllProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Admin check function
export const checkIsAdmin = async () => {
  const { data, error } = await supabase.rpc('is_admin');
  return { isAdmin: !!data, error };
};
