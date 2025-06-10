import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyManagement from '@/components/admin/PropertyManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import RecentlyListedProperties from '@/components/admin/RecentlyListedProperties';
import MediaUploader from '@/components/admin/MediaUploader';
import { supabase } from '@/lib/supabase';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: 'residential' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, isLoading, isAuthenticated, isAdmin, refreshSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and admin
    const checkAccess = () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          toast({
            title: 'Access Denied',
            description: 'Please sign in to access the admin area.',
            variant: 'destructive'
          });
          navigate('/auth');
          return;
        }
        
        if (!isAdmin) {
          toast({
            title: 'Access Denied',
            description: 'Only administrators can access this page.',
            variant: 'destructive'
          });
          navigate('/');
          return;
        }
      }
    };
    
    checkAccess();
  }, [isLoading, isAuthenticated, isAdmin, navigate, toast]);

  const fetchProperties = async () => {
    setPropertiesLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        // Check if it's a JWT expiration error
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          console.log('JWT expired, attempting to refresh session...');
          const { error: refreshError } = await refreshSession();
          
          if (refreshError) {
            console.error('Failed to refresh session:', refreshError);
            toast({
              title: "Session Expired",
              description: "Please sign in again to continue.",
              variant: "destructive",
            });
            navigate('/auth');
            return;
          }
          
          // Retry the fetch after refreshing
          const { data: retryData, error: retryError } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (retryError) throw retryError;
          
          const formattedProperties = (retryData || []).map(property => ({
            id: property.id.toString(),
            title: property.title,
            location: property.location,
            price: `$${property.price.toLocaleString()}`,
            type: property.type as 'residential' | 'commercial',
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area || '',
            image: property.image || '',
            featured: property.featured || false,
            created_at: property.created_at
          }));
          
          setProperties(formattedProperties);
        } else {
          throw error;
        }
      } else {
        const formattedProperties = (data || []).map(property => ({
          id: property.id.toString(),
          title: property.title,
          location: property.location,
          price: `$${property.price.toLocaleString()}`,
          type: property.type as 'residential' | 'commercial',
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area || '',
          image: property.image || '',
          featured: property.featured || false,
          created_at: property.created_at
        }));
        
        setProperties(formattedProperties);
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchProperties();
    }
  }, [isAuthenticated, isAdmin]);

  const handleEditProperty = (property: Property) => {
    // This will be handled by the PropertyManagement component
    console.log('Edit property:', property);
  };

  const handleMediaAdd = (media: { type: 'image' | 'video'; url: string; title: string }) => {
    // Handle media addition - you can integrate this with property management
    console.log('Media added:', media);
    toast({
      title: "Media Added",
      description: `${media.title} has been added to the media library`,
    });
  };
  
  if (isLoading || propertiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // This will be redirected by the useEffect
  }
  
  return (
    <div className="min-h-screen bg-royal-50/50 dark:bg-royal-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-royal-800 dark:text-royal-200">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-royal-600 dark:text-royal-300 mt-2">
            Comprehensive property management and analytics platform
          </p>
        </div>
        
        {/* Recently Listed Properties Section */}
        <div className="mb-8">
          <RecentlyListedProperties 
            properties={properties} 
            onEdit={handleEditProperty}
          />
        </div>
        
        <div className="bg-white dark:bg-royal-800 rounded-lg shadow-lg p-6">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="properties">Property Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
              <TabsTrigger value="media">Media Manager</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <PropertyManagement />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="media">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Media Management</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload and manage images and videos for your properties
                  </p>
                </div>
                <MediaUploader onMediaAdd={handleMediaAdd} maxFiles={20} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
