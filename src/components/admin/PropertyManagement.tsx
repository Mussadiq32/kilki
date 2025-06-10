import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
} from '@/components/ui/alert-dialog';
import PropertyForm from './PropertyForm';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Building,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface Property {
  id: string;
  title: string;
  description: string;
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

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { refreshSession } = useAuth();

  const cities = ['Srinagar', 'Delhi', 'Bangalore', 'Chandigarh', 'Gurgaon', 'Jammu', 'Hyderabad', 'Ahmedabad', 'Mumbai'];

  const fetchProperties = async () => {
    setLoading(true);
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
            return;
          }
          
          // Retry the fetch after refreshing
          const { data: retryData, error: retryError } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (retryError) throw retryError;
          setProperties(retryData || []);
        } else {
          throw error;
        }
      } else {
        setProperties(data || []);
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
    
    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        () => {
          console.log('Property table change detected, refreshing data...');
          fetchProperties();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

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
      
      toast({
        title: "Property Deleted",
        description: "Property has been successfully deleted.",
      });
      
      fetchProperties();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ featured: !currentFeatured })
        .eq('id', id);
        
      if (error) {
        // Check if it's a JWT expiration error
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          console.log('JWT expired during update, attempting to refresh session...');
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
          
          // Retry the update after refreshing
          const { error: retryError } = await supabase
            .from('properties')
            .update({ featured: !currentFeatured })
            .eq('id', id);
            
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      
      toast({
        title: "Featured Status Updated",
        description: "Property featured status has been updated.",
      });
      
      fetchProperties();
    } catch (error: any) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedProperty(null);
    fetchProperties();
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesLocation = filterLocation === 'all' || property.location.toLowerCase().includes(filterLocation.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'} 
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-gold-500">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-gold-600">₹{property.price}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {property.type === 'residential' && (
                <>
                  <span>{property.bedrooms} BHK</span>
                  <span>•</span>
                </>
              )}
              <span>{property.area}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleFeatured(property.id, property.featured)}
            >
              <Star className={`h-4 w-4 mr-1 ${property.featured ? 'fill-current' : ''}`} />
              {property.featured ? 'Unfeature' : 'Feature'}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Property</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{property.title}"? This action cannot be undone.
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
        </div>
      </CardContent>
    </Card>
  );

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedProperty ? 'Update property details' : 'Create a new property listing'}
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Back to Properties
          </Button>
        </div>
        
        <PropertyForm 
          property={selectedProperty} 
          onSuccess={handleFormSuccess} 
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your property listings</p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Home className="h-8 w-8 text-gold-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Properties</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.featured).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Residential</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.type === 'residential').length}</p>
              </div>
              <Home className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Commercial</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.type === 'commercial').length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p>Try adjusting your search criteria or add a new property.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyManagement; 