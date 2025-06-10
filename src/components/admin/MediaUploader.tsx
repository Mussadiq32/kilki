import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Link2, Image, Video, File, X, Plus, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaFile {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  file?: File;
  preview?: string;
}

interface MediaUploaderProps {
  onMediaAdd: (media: { type: 'image' | 'video'; url: string; title: string }) => void;
  maxFiles?: number;
}

const MediaUploader = ({ onMediaAdd, maxFiles = 10 }: MediaUploaderProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    if (mediaFiles.length + files.length > maxFiles) {
      toast({
        title: "Limit Exceeded",
        description: `You can only upload ${maxFiles} files total. Currently have ${mediaFiles.length}, trying to add ${files.length}.`,
        variant: "destructive",
      });
      return;
    }

    files.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        toast({
          title: "Invalid File Type",
          description: `"${file.name}" is not a valid image or video file`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newMedia: MediaFile = {
          id: Date.now().toString() + Math.random(),
          type: isImage ? 'image' : 'video',
          url: e.target?.result as string,
          title: file.name.split('.')[0],
          file,
          preview: isImage ? e.target?.result as string : undefined
        };
        
        setMediaFiles(prev => [...prev, newMedia]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    event.target.value = '';
  }, [mediaFiles.length, maxFiles, toast]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Create a synthetic event to reuse the existing file upload logic
      const syntheticEvent = {
        target: { files: files as any }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(syntheticEvent);
    }
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    
    if (mediaFiles.length >= maxFiles) {
      toast({
        title: "Limit Reached",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    const isVideoUrl = urlInput.includes('youtube.com') || 
                      urlInput.includes('vimeo.com') || 
                      urlInput.includes('.mp4') ||
                      urlInput.includes('.webm') ||
                      urlInput.includes('.ogg');

    const newMedia: MediaFile = {
      id: Date.now().toString(),
      type: isVideoUrl ? 'video' : 'image',
      url: urlInput.trim(),
      title: titleInput.trim() || 'Media Item'
    };
    
    setMediaFiles(prev => [...prev, newMedia]);
    setUrlInput('');
    setTitleInput('');
  };

  const removeMedia = (id: string) => {
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  const addAllToProperty = () => {
    mediaFiles.forEach(media => {
      onMediaAdd({
        type: media.type,
        url: media.url,
        title: media.title
      });
    });
    
    setMediaFiles([]);
    toast({
      title: "Media Added",
      description: `${mediaFiles.length} media items added to property`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Uploader
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Method Toggle */}
        <div className="flex gap-2">
          <Button
            variant={uploadMethod === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMethod('file')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          <Button
            variant={uploadMethod === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMethod('url')}
          >
            <Link2 className="h-4 w-4 mr-2" />
            Add URL
          </Button>
        </div>

        {/* File Upload Method - Now Default */}
        {uploadMethod === 'file' && (
          <div className="space-y-4">
            {/* Drag and Drop Area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop images here or click to browse
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Supports JPG, PNG, GIF and video files. Maximum {maxFiles} files.
              </p>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Select from Gallery
                  </span>
                </Button>
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                You can select multiple files at once from your gallery
              </p>
            </div>
          </div>
        )}

        {/* URL Input Method */}
        {uploadMethod === 'url' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="media-url">Media URL</Label>
              <Input
                id="media-url"
                placeholder="https://example.com/image.jpg or YouTube URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="media-title">Title (optional)</Label>
              <Input
                id="media-title"
                placeholder="Enter media title"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </div>
            <Button onClick={handleUrlAdd} disabled={!urlInput.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add URL
            </Button>
          </div>
        )}

        {/* Media Preview */}
        {mediaFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Ready to Add ({mediaFiles.length}/{maxFiles})</h4>
              <Button onClick={addAllToProperty} size="sm">
                Add All to Property
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {mediaFiles.map((media) => (
                <div key={media.id} className="relative group">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {media.type === 'image' ? (
                      <img
                        src={media.preview || media.url}
                        alt={media.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(media.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {media.type}
                    </Badge>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {media.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaUploader; 