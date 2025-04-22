'use client';

import { ImagePlus, Loader2 } from 'lucide-react';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';

import { MAX_IMAGE_SIZE } from '@/config/constants';
import { endpoints } from '@/config/endpoints';
import { api } from '@/lib/api-client';
import { cn, convertToMb } from '@/lib/utils';

type ImageUploaderProps = {
  defaultValue?: string;
  onUploadComplete: (url: string) => void;
};

export const ImageUploader = (props: ImageUploaderProps) => {
  const { onUploadComplete, defaultValue } = props;
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(!!defaultValue);
  const [draggingOver, setDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File size exceeds ${convertToMb(file.size)} limit`);
      return;
    }

    setError(null);
    setIsUploading(true);

    if (preview !== defaultValue) {
      setPreview(null);
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post<{ url: string }>(endpoints.images.singleUpload, {
        body: formData,
      });
      const { url } = response;
      onUploadComplete(url);
      setUploadComplete(true);
    } catch (error) {
      console.log('Error uploading file: ', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File size exceeds ${convertToMb(file.size)} limit`);
      return;
    }

    setError(null);
    setIsUploading(true);

    if (preview !== defaultValue) {
      setPreview(null);
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post<{ url: string }>(endpoints.images.singleUpload, {
        body: formData,
      });

      const { url } = response;

      onUploadComplete(url);
      setUploadComplete(true);
    } catch (error) {
      console.log('Error uploading file: ', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const stopEvent = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e: DragEvent<HTMLInputElement>) => {
    stopEvent(e);
  };
  const handleDragLeave = (e: DragEvent<HTMLInputElement>) => {
    stopEvent(e);
    setDraggingOver(false);
  };
  const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
    stopEvent(e);
    setDraggingOver(true);
  };

  const handleClick = () => {
    if (uploadComplete && preview) return;
    inputRef.current?.click();
  };

  return (
    <div className="w-full mx-auto">
      <div
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (!uploadComplete && (e.key === 'Enter' || e.key === ' ')) {
            handleClick();
          }
        }}
        role="button"
        tabIndex={uploadComplete ? -1 : 0}
        aria-label={preview ? 'Uploaded image preview' : 'Click or drag to upload image'}
        className={cn(
          'relative flex aspect-3/2 flex-col items-center justify-center rounded-md border-border dark:border-input',
          !preview && 'cursor-pointer',
          error && 'border-destructive border-2 border-dotted',
          isUploading && 'pointer-events-none opacity-50',
          draggingOver && 'opacity-50',
          !uploadComplete &&
            !preview &&
            'border-2 border-dashed border-muted-foreground/50 dark:border-muted-foreground/40'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading || uploadComplete}
          multiple={false}
        />
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-md" />
          </>
        ) : (
          <div className="text-center flex items-center justify-center flex-col p-4">
            <ImagePlus className="mx-auto w-12 h-12 text-muted-foreground" />
            <p className="mt-1 text-sm text-muted-foreground">
              Click or drag to upload image (max {convertToMb(MAX_IMAGE_SIZE)}mb)
            </p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/75 dark:bg-background/80 rounded-md">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
};
