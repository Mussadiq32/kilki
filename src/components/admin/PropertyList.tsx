import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2, Eye } from 'lucide-react';
import PropertyForm from './PropertyForm';

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

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all');
  const { toast } = useToast();
  const { refreshSession } = useAuth();
  
  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase.from('properties').select('*');
      
      if (activeTab !== 'all') {
        query = query.eq('type', activeTab);
      }
      
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
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
            return;
          }
          
          // Retry the fetch after refreshing
          let retryQuery = supabase.from('properties').select('*');
          
          if (activeTab !== 'all') {
            retryQuery = retryQuery.eq('type', activeTab);
          }
          
          retryQuery = retryQuery.order('created_at', { ascending: false });
          
          const { data: retryData, error: retryError } = await retryQuery;
          
          if (retryError) throw retryError;
          setProperties(retryData as Property[]);
        } else {
          throw error;
        }
      } else {
        setProperties(data as Property[]);
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProperties();
  }, [activeTab]);
  
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      if (error) {
        // Check if it's a JWT expiration error
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          console.log('JWT expired during delete, attempting to refresh session...');
          const { error: refreshError } = await refreshSession();
          
          if (refreshError) {
            console.error('Failed to refresh session:', refreshError);
            toast({
              title: "Session Expired",
              description: "Please sign in again to continue.",
              variant: "destructive",
            });
            return;
          }
          
          // Retry the delete after refreshing
          const { error: retryError } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);
            
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      
      setProperties(properties.filter(property => property.id !== id));
      
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    }
  };
  
  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowEditForm(true);
  };
  
  const handleEditSuccess = () => {
    setShowEditForm(false);
    setSelectedProperty(null);
    fetchProperties();
  };
  
  const renderPropertyTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    if (properties.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-royal-600">No properties found.</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left py-3 px-4 font-semibold text-royal-700">Title</TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-royal-700">Location</TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-royal-700">Price</TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-royal-700">Type</TableHead>
              <TableHead className="text-left py-3 px-4 font-semibold text-royal-700">Featured</TableHead>
              <TableHead className="text-right py-3 px-4 font-semibold text-royal-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id} className="border-b border-gray-200 hover:bg-royal-50/50">
                <TableCell className="py-3 px-4">{property.title}</TableCell>
                <TableCell className="py-3 px-4">{property.location}</TableCell>
                <TableCell className="py-3 px-4">{property.price}</TableCell>
                <TableCell className="py-3 px-4 capitalize">{property.type}</TableCell>
                <TableCell className="py-3 px-4">
                  {property.featured ? (
                    <span className="bg-gold-100 text-gold-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Featured
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Standard
                    </span>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(property)}
                    >
                      <Pencil size={16} />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the property
                            "{property.title}" and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(property.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  return (
    <div>
      {showEditForm ? (
        <div>
          <div className="mb-4">
            <Button variant="outline" onClick={() => {
              setShowEditForm(false);
              setSelectedProperty(null);
            }}>
              Back to Properties
            </Button>
          </div>
          <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
          {selectedProperty && (
            <PropertyForm 
              property={selectedProperty} 
              onSuccess={handleEditSuccess} 
            />
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => setActiveTab('all')}
                className={activeTab === 'all' ? 'bg-gold-500 text-white' : ''}
              >
                All Properties
              </TabsTrigger>
              <TabsTrigger 
                value="residential" 
                onClick={() => setActiveTab('residential')}
                className={activeTab === 'residential' ? 'bg-gold-500 text-white' : ''}
              >
                Residential
              </TabsTrigger>
              <TabsTrigger 
                value="commercial" 
                onClick={() => setActiveTab('commercial')}
                className={activeTab === 'commercial' ? 'bg-gold-500 text-white' : ''}
              >
                Commercial
              </TabsTrigger>
            </TabsList>
          </div>
          
          {renderPropertyTable()}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
