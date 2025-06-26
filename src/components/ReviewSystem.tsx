import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import PropertyReviews from './PropertyReviews';
import {
  Star,
  Search,
  Filter,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  average_rating?: number;
  review_count?: number;
}

const ReviewSystem = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, location')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get review stats for each property
      const propertiesWithStats = await Promise.all((data || []).map(async (property) => {
        const { data: avgRating } = await supabase.rpc('get_property_average_rating', {
          property_id_param: property.id
        });
        
        const { data: reviewCount } = await supabase.rpc('get_property_review_count', {
          property_id_param: property.id
        });

        return {
          ...property,
          average_rating: Number(avgRating) || 0,
          review_count: reviewCount || 0
        };
      }));

      setProperties(propertiesWithStats);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReviews = properties.reduce((sum, prop) => sum + (prop.review_count || 0), 0);
  const averageRating = properties.length > 0 
    ? properties.reduce((sum, prop) => sum + (prop.average_rating || 0), 0) / properties.length 
    : 0;

  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProperty(null)}
              className="mb-4"
            >
              ← Back to Properties
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reviews for {selectedProperty.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {selectedProperty.location}
            </p>
          </div>
          
          <PropertyReviews 
            propertyId={selectedProperty.id} 
            propertyTitle={selectedProperty.title}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Property Reviews</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Browse and manage reviews for all properties
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{totalReviews}</div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{properties.length}</div>
                  <p className="text-sm text-gray-600">Properties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {properties.filter(p => (p.review_count || 0) > 0).length}
                  </div>
                  <p className="text-sm text-gray-600">With Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{property.location}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {property.review_count > 0 ? (
                          <>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{property.average_rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-600">
                              ({property.review_count} review{property.review_count !== 1 ? 's' : ''})
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No reviews yet</span>
                        )}
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => setSelectedProperty(property)}
                    >
                      View Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && !loading && (
          <Card>
            <CardContent className="py-20 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No properties found matching your search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem; 