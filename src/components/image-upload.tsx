import React from "react";
import { Button, Card, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  itemId?: string; // For uploading to server when editing existing items
}

interface UploadingFile {
  name: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ images, onChange, itemId }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadingFiles, setUploadingFiles] = React.useState<UploadingFile[]>([]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Initialize upload tracking
    const fileList: UploadingFile[] = Array.from(files).map(file => ({
      name: file.name,
      status: 'pending'
    }));
    setUploadingFiles(fileList);
    setUploadProgress(0);
    
    try {
      // If we have an itemId, upload to server
      if (itemId) {
        await uploadToServer(files, fileList);
      } else {
        // For new items, convert to base64 for temporary storage
        await convertToBase64(files, fileList);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error}`);
    } finally {
      setIsUploading(false);
      
      // Clear the input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clear uploading files after 2 seconds to show final state
      setTimeout(() => {
        setUploadingFiles([]);
        setUploadProgress(0);
      }, 2000);
    }
  };
  
  const uploadToServer = async (files: FileList, fileList: UploadingFile[]) => {
    const formData = new FormData();
    formData.append('itemId', itemId!);
    
    Array.from(files).forEach((file, index) => {
      formData.append(`image${index}`, file);
    });
    
    // Update UI to show uploading
    setUploadingFiles(prev => prev.map(f => ({ ...f, status: 'uploading' })));
    
    const response = await fetch('/upload-item-images.php', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      // Update progress and status for each file
      const newUploadingFiles = [...fileList];
      let completedCount = 0;
      
      // Mark successful uploads
      result.images.forEach((img: any) => {
        const fileIndex = newUploadingFiles.findIndex(f => f.name === img.originalName);
        if (fileIndex !== -1) {
          newUploadingFiles[fileIndex].status = 'success';
          newUploadingFiles[fileIndex].url = img.url;
          completedCount++;
        }
      });
      
      // Mark failed uploads
      result.errors?.forEach((err: any) => {
        const fileIndex = newUploadingFiles.findIndex(f => f.name === err.originalName);
        if (fileIndex !== -1) {
          newUploadingFiles[fileIndex].status = 'error';
          newUploadingFiles[fileIndex].error = err.error;
          completedCount++;
        }
      });
      
      setUploadingFiles(newUploadingFiles);
      setUploadProgress(100);
      
      // Add successful images to the list
      const newImageUrls = result.images.map((img: any) => img.url);
      onChange([...images, ...newImageUrls]);
      
      if (result.errors && result.errors.length > 0) {
        alert(`${result.successCount} images uploaded successfully, ${result.errorCount} failed. Check the status below.`);
      }
    } else {
      throw new Error(result.error || 'Upload failed');
    }
  };
  
  const convertToBase64 = async (files: FileList, fileList: UploadingFile[]) => {
    const filePromises = Array.from(files).map((file, index) => {
      return new Promise<string>((resolve, reject) => {
        // Update status to uploading
        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[index].status = 'uploading';
          return updated;
        });
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadingFiles(prev => {
            const updated = [...prev];
            updated[index].status = 'error';
            updated[index].error = 'Not an image file';
            return updated;
          });
          reject(new Error('Not an image file'));
          return;
        }
        
        // Validate file size (10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          setUploadingFiles(prev => {
            const updated = [...prev];
            updated[index].status = 'error';
            updated[index].error = 'File too large (max 10MB)';
            return updated;
          });
          reject(new Error('File too large'));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const url = event.target.result as string;
            
            // Update status to success
            setUploadingFiles(prev => {
              const updated = [...prev];
              updated[index].status = 'success';
              updated[index].url = url;
              return updated;
            });
            
            // Update progress
            const progress = ((index + 1) / files.length) * 100;
            setUploadProgress(progress);
            
            resolve(url);
          } else {
            setUploadingFiles(prev => {
              const updated = [...prev];
              updated[index].status = 'error';
              updated[index].error = 'Failed to read file';
              return updated;
            });
            reject(new Error('Failed to read file'));
          }
        };
        
        reader.onerror = () => {
          setUploadingFiles(prev => {
            const updated = [...prev];
            updated[index].status = 'error';
            updated[index].error = 'Failed to read file';
            return updated;
          });
          reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
      });
    });
    
    try {
      const newImages = await Promise.all(filePromises);
      onChange([...images, ...newImages]);
    } catch (error) {
      console.error('Some files failed to process:', error);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    
    // If it's a server URL and we have an itemId, delete from server
    if (itemId && imageToRemove.startsWith('http')) {
      const path = new URL(imageToRemove).pathname;
      
      fetch('/delete-item-image.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          const newImages = [...images];
          newImages.splice(index, 1);
          onChange(newImages);
        } else {
          alert(`Failed to delete image: ${result.error}`);
        }
      })
      .catch(error => {
        console.error('Error deleting image:', error);
        alert(`Error deleting image: ${error}`);
      });
    } else {
      // Local base64 image, just remove from array
      const newImages = [...images];
      newImages.splice(index, 1);
      onChange(newImages);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Upload Progress */}
      {isUploading && (
        <Card className="p-4 bg-blue-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Uploading {uploadingFiles.filter(f => f.status === 'success').length} of {uploadingFiles.length} images
              </span>
              <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
            </div>
            
            <Progress 
              value={uploadProgress} 
              color="primary"
              className="w-full"
            />
            
            {/* File status list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {file.status === 'success' && (
                    <Icon icon="lucide:check-circle" className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                  {file.status === 'error' && (
                    <Icon icon="lucide:x-circle" className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  {file.status === 'uploading' && (
                    <Icon icon="lucide:loader" className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
                  )}
                  {file.status === 'pending' && (
                    <Icon icon="lucide:circle" className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  )}
                  
                  <span className={`truncate ${file.status === 'error' ? 'text-red-600' : ''}`}>
                    {file.name}
                    {file.error && <span className="text-xs ml-2">({file.error})</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="relative group">
            <img 
              src={image} 
              alt={`Item image ${index + 1}`} 
              className="w-full h-40 object-cover"
            />
            <Button
              isIconOnly
              color="danger"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onPress={() => removeImage(index)}
            >
              <Icon icon="lucide:trash-2" />
            </Button>
          </Card>
        ))}
        
        {/* Upload placeholder */}
        {images.length < 8 && (
          <Card 
            className="h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-default-300 hover:border-primary transition-colors"
            onPress={triggerFileInput}
            isPressable
          >
            <Icon icon="lucide:image-plus" className="w-8 h-8 text-default-400 mb-2" />
            <p className="text-default-600 text-sm">Add Images</p>
          </Card>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          color="primary"
          variant="flat"
          startContent={<Icon icon="lucide:upload" />}
          onPress={triggerFileInput}
          isDisabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Images"}
        </Button>
      </div>
      
      <p className="text-xs text-default-500">
        Upload high-quality images (max 10MB each, up to 8 images total). 
        {itemId ? ' Images are automatically saved to the server.' : ' Images will be saved when you create the item.'}
      </p>
    </div>
  );
};