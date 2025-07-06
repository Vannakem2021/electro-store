"use client";

import React, { useState, useRef, useCallback } from "react";

import { useToast } from "@/contexts/ToastContext";
import { UploadIcon, XIcon, ImageIcon } from "@/components/ui/Icons";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 10,
  maxFileSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  className = "",
}) => {
  const { showError, showSuccess } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      showError(
        "Invalid File Type",
        `Please upload ${acceptedTypes.join(", ")} files only.`
      );
      return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      showError(
        "File Too Large",
        `Please upload files smaller than ${maxFileSize}MB.`
      );
      return false;
    }

    return true;
  };

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      const validFiles = Array.from(files).filter(validateFile);

      if (validFiles.length === 0) return;

      if (images.length + validFiles.length > maxImages) {
        showError(
          "Too Many Images",
          `You can only upload up to ${maxImages} images.`
        );
        return;
      }

      setUploading(true);

      try {
        // Simulate file upload - in real app, this would upload to cloud storage
        const uploadPromises = validFiles.map(async (file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              // In real app, you would upload to cloud storage and get URL
              // For now, we'll use the data URL as placeholder
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const newImages = [...images, ...uploadedUrls];
        onImagesChange(newImages);

        showSuccess(
          "Upload Successful",
          `${validFiles.length} image(s) uploaded successfully.`
        );
      } catch (error) {
        showError(
          "Upload Failed",
          "Failed to upload images. Please try again."
        );
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onImagesChange, showError, showSuccess]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(files);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [handleFileUpload]
  );

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-md p-6 text-center transition-colors duration-200 ${
          dragOver
            ? "border-teal-400 bg-teal-50"
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mx-auto">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
            ) : (
              <UploadIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              {uploading ? "Uploading..." : "Click to upload"}
            </button>
            <p className="text-sm text-gray-500">or drag and drop</p>
          </div>

          <p className="text-xs text-gray-400">
            PNG, JPG, WEBP up to {maxFileSize}MB (max {maxImages} images)
          </p>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square bg-gray-100 rounded-md overflow-hidden"
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded font-rubik">
                  Primary
                </div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
              >
                <XIcon className="w-4 h-4" />
              </button>

              {/* Move Buttons */}
              <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
