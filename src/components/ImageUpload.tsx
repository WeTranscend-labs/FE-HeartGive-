import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  value?: string;
}

export function ImageUpload({ onImageSelect, value }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // In a real app, you'd upload to a server
      // For demo, we'll create an object URL
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      
      {value ? (
        <div className="relative aspect-video">
          <img
            src={value}
            alt="Campaign preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
            <span className="text-white text-sm">Click or drag to change image</span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <span className="relative rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
              Upload a file
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  );
}