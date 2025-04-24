import { ImagePlus, Loader2 } from 'lucide-react';
import { cn, convertToMb } from '@/lib/utils';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { MAX_IMAGE_SIZE } from '@/config/constants';

import type { ClassifiedImages } from '../types';

type DragAndDropProps = {
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  items: ClassifiedImages;
  setFiles: (validFile: File[]) => void;
};

export const DragAndDrop = (props: DragAndDropProps) => {
  const { isUploading } = props;

  const { dropRef, inputRef, isError, isDraggingOver, handleClick, handleUpload } =
    useDragAndDrop(props);

  return (
    <>
      <div
        ref={dropRef}
        className={cn(
          'relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted/75',
          isError.status && 'border-red-500',
          isUploading && 'pointer-events-none'
        )}
      >
        <input
          disabled={isUploading}
          multiple
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <div
          onClick={handleClick}
          className={cn(
            'flex w-full h-full flex-col items-center justify-center text-center font-medium',
            isUploading || (isDraggingOver && 'opacity-75')
          )}
          onKeyDown={handleClick}
        >
          <ImagePlus className="mx-auto mb-3 h-auto w-9 text-gray-400" />
          <p className="mb-1">
            <span className="text-primary">Upload Files or drag and drop</span>
          </p>
          <p className="text-xs text-primary">
            PNG, JPG, WEBP, up to {convertToMb(MAX_IMAGE_SIZE)} each.
          </p>
        </div>
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
      {isError.status && (
        <div className="flex w-full flex-wrap justify-between md:mt-3">
          <span className="text-sm font-medium text-red-500">{isError.message}</span>
        </div>
      )}
    </>
  );
};
