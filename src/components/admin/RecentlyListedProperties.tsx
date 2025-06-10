import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface RecentlyListedPropertiesProps {
  properties: Property[];
  onEdit: (property: Property) => void;
}

const RecentlyListedProperties = ({ properties = [], onEdit }: RecentlyListedPropertiesProps) => {
  const navigate = useNavigate();
  const [propertyImages, setPropertyImages] = useState<Record<string, string>>({});
  
  const recentProperties = properties?.slice(0, 5) || [];

  useEffect(() => {
    const fetchPrimaryImages = async () => {
      if (recentProperties.length === 0) return;
      
      const imagePromises = recentProperties.map(async (property) => {
        try {
          const { data, error } = await supabase
            .from('property_media')
            .select('media_url')
            .eq('property_id', parseInt(property.id))
            .eq('media_type', 'image')
            .eq('is_primary', true)
            .single();
          
          if (data && !error) {
            return { id: property.id, url: data.media_url };
          } else {
            // If no primary image, get the first image
            const { data: firstImage } = await supabase
              .from('property_media')
              .select('media_url')
              .eq('property_id', parseInt(property.id))
              .eq('media_type', 'image')
              .order('display_order', { ascending: true })
              .limit(1)
              .single();
            
            return { 
              id: property.id, 
              url: firstImage?.media_url || property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
            };
          }
        } catch (error) {
          return { 
            id: property.id, 
            url: property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
          };
        }
      });

      const results = await Promise.all(imagePromises);
      const imageMap = results.reduce((acc, { id, url }) => {
        acc[id] = url;
        return acc;
      }, {} as Record<string, string>);
      
      setPropertyImages(imageMap);
    };

    fetchPrimaryImages();
  }, [recentProperties]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (!properties || properties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recently Listed Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center">
          No properties listed yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recently Listed Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentProperties.map((property) => {
            const displayImage = propertyImages[property.id] || property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800';
            
            return (
              <div key={property.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={displayImage}
                    alt={property.title}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                    <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Listed on: {formatDate(property.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(property)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyListedProperties;
