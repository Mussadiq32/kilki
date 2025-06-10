import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import MediaManager from './MediaManager';

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().min(1, { message: "Price is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.enum(["residential", "commercial"]),
  bedrooms: z.coerce.number().nonnegative({ message: "Bedrooms must be 0 or higher" }),
  bathrooms: z.coerce.number().nonnegative({ message: "Bathrooms must be 0 or higher" }),
  area: z.string().min(1, { message: "Area is required" }),
  image: z.string().url({ message: "Please enter a valid image URL" }).optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PropertyImage {
  id: string;
  file: File;
  preview: string;
  title: string;
}

const PropertyForm = ({ property, onSuccess }: { property?: any, onSuccess?: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedPropertyId, setSavedPropertyId] = useState<number | null>(property?.id || null);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
  const { toast } = useToast();
  
  const defaultValues: FormValues = property ? {
    title: property.title || "",
    description: property.description || "",
    price: property.price || "",
    location: property.location || "",
    type: property.type || "residential",
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || "",
    image: property.image || "",
    featured: property.featured || false,
  } : {
    title: "",
    description: "",
    price: "",
    location: "",
    type: "residential",
    bedrooms: 0,
    bathrooms: 0,
    area: "",
    image: "",
    featured: false,
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    files.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      
      if (!isImage) {
        toast({
          title: "Invalid File Type",
          description: `"${file.name}" is not a valid image file`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: PropertyImage = {
          id: Date.now().toString() + Math.random(),
          file,
          preview: e.target?.result as string,
          title: file.name.split('.')[0],
        };
        
        setPropertyImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setPropertyImages(prev => prev.filter(img => img.id !== id));
  };
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      let propertyId = property?.id;
      
      if (property?.id) {
        const { error } = await supabase
          .from('properties')
          .update(data)
          .eq('id', property.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
      } else {
        const { data: insertData, error } = await supabase
          .from('properties')
          .insert([{ 
            ...data,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();
          
        if (error) throw error;
        
        propertyId = insertData.id;
        setSavedPropertyId(insertData.id);
        
        toast({
          title: "Success",
          description: "Property created successfully",
        });
      }

      // Upload images if any
      if (propertyImages.length > 0 && propertyId) {
        for (let i = 0; i < propertyImages.length; i++) {
          const image = propertyImages[i];
          
          try {
            const { error: mediaError } = await supabase
              .from('property_media')
              .insert([{
                property_id: propertyId,
                media_type: 'image',
                media_url: image.preview,
                media_title: image.title,
                display_order: i + 1,
                is_primary: i === 0
              }]);
            
            if (mediaError) throw mediaError;
          } catch (error: any) {
            console.error('Error uploading image:', error);
            toast({
              title: "Warning",
              description: `Failed to upload image: ${image.title}`,
              variant: "destructive",
            });
          }
        }
        
        if (propertyImages.length > 0) {
          toast({
            title: "Images Uploaded",
            description: `${propertyImages.length} images uploaded successfully`,
          });
          setPropertyImages([]);
        }
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const validateNumericInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormValues) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      form.setValue(fieldName, value === '' ? 0 : parseFloat(value) as any);
    }
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Property Details</TabsTrigger>
        <TabsTrigger value="media">Photos & Videos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Luxury Villa with Garden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="2.5 Cr" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter price with format (e.g., "2.5 Cr" or "35 Lac")
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the property" 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Srinagar, Jammu & Kashmir" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="2,200 sq.ft" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="1"
                        onChange={(e) => validateNumericInput(e, 'bedrooms')}
                        value={field.value}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.5"
                        onChange={(e) => validateNumericInput(e, 'bathrooms')}
                        value={field.value}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Featured Property</FormLabel>
                      <FormDescription>
                        Display this property in the featured section
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Property Images</Label>
                    <p className="text-sm text-muted-foreground">
                      Upload multiple images from your gallery
                    </p>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <Label htmlFor="property-images" className="cursor-pointer">
                      <Button type="button" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Select Images from Gallery
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="property-images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      You can select multiple images at once
                    </p>
                  </div>

                  {/* Image Preview */}
                  {propertyImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {propertyImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={image.preview}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <p className="text-xs text-gray-600 truncate mt-1">
                            {image.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL for the property image (alternative to uploading files above)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : property?.id ? 'Update Property' : 'Create Property'}
              </Button>
              
              <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="media">
        <MediaManager propertyId={savedPropertyId} />
      </TabsContent>
    </Tabs>
  );
};

export default PropertyForm;
