import React from "react";
import { Button, Card, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ images, onChange }) => {
  // Add file input reference
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Add state for upload progress
  const [isUploading, setIsUploading] = React.useState(false);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Process each file
    const filePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve, reject) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          reject(new Error('Please select only image files'));
          return;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          reject(new Error('File size must be less than 5MB'));
          return;
        }
        
        // Create a FileReader to read the image
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            // Use the actual file data as base64 data URL
            resolve(event.target.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        
        // Read the file as a data URL (base64)
        reader.readAsDataURL(file);
      });
    });
    
    // Wait for all files to be processed
    Promise.all(filePromises)
      .then(newImages => {
        // Add the new images to the existing ones
        onChange([...images, ...newImages]);
        setIsUploading(false);
      })
      .catch(error => {
        console.error('Error uploading files:', error);
        setIsUploading(false);
      });
    
    // Clear the input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Trigger file input click
  const triggerFileInput = (captureMethod?: string) => {
    if (fileInputRef.current) {
      if (captureMethod) {
        fileInputRef.current.setAttribute('capture', captureMethod);
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };
  
  // Add image from HeroUI service (for demo purposes)
  const addDemoImage = () => {
    // Generate a random image from HeroUI image service
    const categories = ["furniture", "places", "album", "book"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const newImage = `https://img.heroui.chat/image/${category}?w=800&h=600&u=${uniqueId}`;
    
    onChange([...images, newImage]);
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="relative group">
            <img 
              src={image} 
              alt={`Product image ${index + 1}`} 
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
        
        {/* Upload placeholder card */}
        {images.length < 8 && (
          <Card 
            className="h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-default-300 hover:border-primary transition-colors"
            onPress={() => triggerFileInput()}
          >
            <Icon icon="lucide:image-plus" className="w-8 h-8 text-default-400 mb-2" />
            <p className="text-default-600 text-sm">Click to upload</p>
          </Card>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          color="primary"
          variant="flat"
          startContent={<Icon icon="lucide:upload" />}
          onPress={() => triggerFileInput()}
          isDisabled={isUploading}
          isLoading={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Images"}
        </Button>
        
        <Button
          color="primary"
          variant="flat"
          startContent={<Icon icon="lucide:camera" />}
          onPress={() => triggerFileInput("environment")}
          isDisabled={isUploading}
        >
          Take Photo
        </Button>
        
        <Button
          color="default"
          variant="flat"
          startContent={<Icon icon="lucide:image" />}
          onPress={addDemoImage}
          isDisabled={isUploading}
        >
          Add Demo Image
        </Button>
      </div>
      
      <p className="text-xs text-default-500">
        Upload actual images (max 5MB each, 8 images total).
      </p>
    </div>
  );
};