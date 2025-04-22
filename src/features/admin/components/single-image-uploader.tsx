'use client';

import { CheckCircle, ImagePlus, Loader2 } from 'lucide-react';
import { useRef } from 'react';

import { MAX_IMAGE_SIZE } from '@/config/constants';
import { cn, convertToMb } from '@/lib/utils';
import { useSingleImageUpload } from '../hooks/useSingleImageUpload';

type SingleImageUploaderProps = {
  onUploadComplete: (url: string) => void;
};

export const SingleImageUploader = (props: SingleImageUploaderProps) => {
  const { onUploadComplete } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    preview,
    isUploading,
    uploadComplete,
    draggingOver,
    error,
    handleUpload,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
  } = useSingleImageUpload({ onUploadComplete });

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
          <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-md" />
        ) : (
          <div className="text-center flex items-center justify-center flex-col p-4">
            <ImagePlus className="mx-auto w-12 h-12 text-muted-foreground" />
            <p className="mt-1 text-sm text-muted-foreground">
              Click or drag to upload image (max {convertToMb(MAX_IMAGE_SIZE)})
            </p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/75 dark:bg-background/80 rounded-md">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {uploadComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/75 dark:bg-background/80 rounded-md">
            <CheckCircle className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
};
