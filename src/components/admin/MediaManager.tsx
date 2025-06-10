import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Plus, Trash2, Star, MoveUp, MoveDown, Image, Video, Upload, Eye, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface MediaItem {
  id: string;
  property_id: number;
  media_type: 'image' | 'video';
  media_url: string;
  media_title?: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

interface MediaManagerProps {
  propertyId: number | null;
}

const MediaManager = ({ propertyId }: MediaManagerProps) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { refreshSession } = useAuth();

  const fetchMedia = async () => {
    if (!propertyId) return;
    try {
      const { data, error } = await supabase.from('property_media').select('*').eq('property_id', propertyId).order('display_order', { ascending: true });
      
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
          const { data: retryData, error: retryError } = await supabase.from('property_media').select('*').eq('property_id', propertyId).order('display_order', { ascending: true });
          
          if (retryError) throw retryError;
          setMediaItems(retryData || []);
        } else {
          throw error;
        }
      } else {
        setMediaItems(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching media:', error);
      toast({ title: "Error", description: error.message || "Failed to fetch media items", variant: "destructive" });
    }
  };

  useEffect(() => { fetchMedia(); }, [propertyId]);

  const addMediaFromUploader = async (media: { type: 'image' | 'video'; url: string; title: string }) => {
    if (!propertyId) return;
    setLoading(true);
    try {
      const maxOrder = mediaItems.length > 0 ? Math.max(...mediaItems.map(m => m.display_order)) : 0;
      const { error } = await supabase.from('property_media').insert([{ property_id: propertyId, media_type: media.type, media_url: media.url, media_title: media.title, display_order: maxOrder + 1, is_primary: mediaItems.length === 0 }]);
      
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
          
          // Retry the insert after refreshing
          const { error: retryError } = await supabase.from('property_media').insert([{ property_id: propertyId, media_type: media.type, media_url: media.url, media_title: media.title, display_order: maxOrder + 1, is_primary: mediaItems.length === 0 }]);
          
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      
      fetchMedia();
      toast({ title: "Media Added", description: "Media item has been successfully added." });
    } catch (error: any) {
      console.error('Error adding media:', error);
      toast({ title: "Error", description: error.message || "Failed to add media item", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const deleteMedia = async (id: string) => {
    try {
      const { error } = await supabase.from('property_media').delete().eq('id', id);
      
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
          
          // Retry the delete after refreshing
          const { error: retryError } = await supabase.from('property_media').delete().eq('id', id);
          
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      
      fetchMedia();
      toast({ title: "Media Deleted", description: "Media item has been successfully deleted." });
    } catch (error: any) {
      console.error('Error deleting media:', error);
      toast({ title: "Error", description: error.message || "Failed to delete media item", variant: "destructive" });
    }
  };

  const togglePrimary = async (id: string, currentPrimary: boolean) => {
    try {
      if (!currentPrimary) { 
        const { error: updateAllError } = await supabase.from('property_media').update({ is_primary: false }).eq('property_id', propertyId);
        
        if (updateAllError) {
          // Check if it's a JWT expiration error
          if (updateAllError.message?.includes('JWT') || updateAllError.message?.includes('expired') || updateAllError.message?.includes('invalid')) {
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
            
            // Retry the update after refreshing
            const { error: retryError } = await supabase.from('property_media').update({ is_primary: false }).eq('property_id', propertyId);
            
            if (retryError) throw retryError;
          } else {
            throw updateAllError;
          }
        }
      }
      
      const { error } = await supabase.from('property_media').update({ is_primary: !currentPrimary }).eq('id', id);
      
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
          
          // Retry the update after refreshing
          const { error: retryError } = await supabase.from('property_media').update({ is_primary: !currentPrimary }).eq('id', id);
          
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }
      
      fetchMedia();
      toast({ title: "Primary Status Updated", description: "Primary media status has been updated." });
    } catch (error: any) {
      console.error('Error updating primary status:', error);
      toast({ title: "Error", description: error.message || "Failed to update primary status", variant: "destructive" });
    }
  };

  const moveMedia = async (id: string, direction: 'up' | 'down') => {
    const currentItem = mediaItems.find(m => m.id === id);
    if (!currentItem) return;
    const currentIndex = mediaItems.findIndex(m => m.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= mediaItems.length) return;
    const targetItem = mediaItems[targetIndex];
    try {
      await supabase.from('property_media').update({ display_order: targetItem.display_order }).eq('id', currentItem.id);
      await supabase.from('property_media').update({ display_order: currentItem.display_order }).eq('id', targetItem.id);
      fetchMedia();
    } catch (error: any) {
      console.error('Error moving media:', error);
      toast({ title: "Error", description: "Failed to reorder media items", variant: "destructive" });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL Copied", description: "Media URL has been copied to clipboard" });
  };

  const previewMedia = (url: string) => { setPreviewUrl(url); };

  if (!propertyId) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500"> Save the property first to manage media files. </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Add Media</TabsTrigger>
          <TabsTrigger value="manage">Manage Media ({mediaItems.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-4">
          <MediaUploader onMediaAdd={addMediaFromUploader} />
        </TabsContent>
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Media Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediaItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mediaItems.map((item, index) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        {item.media_type === 'image' ? ( <img src={item.media_url} alt={item.media_title || 'Property media'} className="w-full h-full object-cover" /> ) : ( <div className="w-full h-full bg-gray-200 flex items-center justify-center"> <Video className="h-12 w-12 text-gray-500" /> <span className="ml-2 text-sm text-gray-600">Video</span> </div> )}
                        {item.is_primary && ( <Badge className="absolute top-2 left-2 bg-yellow-500"> <Star className="h-3 w-3 mr-1" /> Primary </Badge> )}
                      </div>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate"> {item.media_title || 'Untitled'} </p>
                            <Badge variant="outline" className="text-xs"> {item.media_type} </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <Button variant="ghost" size="sm" onClick={() => previewMedia(item.media_url)}> <Eye className="h-3 w-3" /> </Button>
                            <Button variant="ghost" size="sm" onClick={() => copyUrl(item.media_url)}> <Copy className="h-3 w-3" /> </Button>
                            <Button variant="ghost" size="sm" onClick={() => togglePrimary(item.id, item.is_primary)}> <Star className={`h-3 w-3 ${item.is_primary ? 'fill-current text-yellow-500' : ''}`} /> </Button>
                            <Button variant="ghost" size="sm" onClick={() => moveMedia(item.id, 'up')} disabled={index === 0}> <MoveUp className="h-3 w-3" /> </Button>
                            <Button variant="ghost" size="sm" onClick={() => moveMedia(item.id, 'down')} disabled={index === mediaItems.length - 1}> <MoveDown className="h-3 w-3" /> </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild> <Button variant="ghost" size="sm"> <Trash2 className="h-3 w-3 text-red-500" /> </Button> </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Media</AlertDialogTitle>
                                  <AlertDialogDescription> Are you sure you want to delete this media item? This action cannot be undone. </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteMedia(item.id)}> Delete </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No media items added yet.</p>
                  <p className="text-sm">Use the "Add Media" tab to upload images and videos.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Media Preview Modal */}
      {previewUrl && ( <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setPreviewUrl(null)}> <div className="max-w-4xl max-h-full p-4"> <img src={previewUrl} alt="Media preview" className="max-w-full max-h-full object-contain" /> </div> </div> )}
    </div>
  );
};

export default MediaManager; 