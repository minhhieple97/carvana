import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { MAX_IMAGES, MAX_IMAGE_SIZE } from '@/config/constants';
import { convertToMb } from '@/lib/utils';

import type { ClassifiedImages } from '../types';

type UseDragAndDropProps = {
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  items: ClassifiedImages;
  setFiles: (validFile: File[]) => void;
};

export const useDragAndDrop = (props: UseDragAndDropProps) => {
  const { setIsUploading, items, setFiles } = props;

  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesRejected, setFilesRejected] = useState<string[]>([]);
  const [isError, setIsError] = useState({ status: false, message: '' });
  const [isDraggingOver, setDraggingOver] = useState(false);

  const clearError = useCallback(() => {
    setIsError({ status: false, message: '' });
  }, []);

  const handleFilesRejected = useCallback((fileSizeTooBig: string[]) => {
    if (fileSizeTooBig.length) {
      setFilesRejected((prev) => [...prev, ...fileSizeTooBig]);
    }
  }, []);

  const validateFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return { validFiles: [], tooMany: false };

      if (MAX_IMAGES < files.length + items.length) {
        return { validFiles: [], tooMany: true };
      }

      const fileSizeTooBig = Array.from(files)
        .filter((file) => file.size > MAX_IMAGE_SIZE)
        .map((file) => file.name);

      handleFilesRejected(fileSizeTooBig);

      const validFiles = Array.from(files).filter((file) => file.size <= MAX_IMAGE_SIZE);

      return { validFiles, tooMany: false };
    },
    [handleFilesRejected, items.length]
  );

  const handleUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      clearError();
      setFilesRejected([]);

      const { validFiles, tooMany } = validateFiles(e.target.files);

      if (tooMany) {
        setIsError({
          status: true,
          message: `You can only upload a maximum of ${MAX_IMAGES} images`,
        });
        return;
      }

      if (validFiles.length) {
        setIsUploading(true);
        setFiles(validFiles);
      }

      e.target.value = '';
    },
    [clearError, setFiles, setIsUploading, validateFiles]
  );

  const handleClick = useCallback(() => inputRef.current?.click(), []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      clearError();
      setFilesRejected([]);
      setDraggingOver(false);

      const { validFiles, tooMany } = validateFiles(e.dataTransfer?.files || null);

      if (tooMany) {
        setIsError({
          status: true,
          message: `You can only upload a maximum of ${MAX_IMAGES} images`,
        });
        return;
      }

      if (validFiles.length) {
        setIsUploading(true);
        setFiles(validFiles);
      }

      e.dataTransfer?.clearData();
    },
    [clearError, setFiles, setIsUploading, validateFiles]
  );

  const stopEvent = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(
    (e: DragEvent) => {
      stopEvent(e);
    },
    [stopEvent]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      stopEvent(e);
      setDraggingOver(false);
    },
    [stopEvent]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      stopEvent(e);
      setDraggingOver(true);
    },
    [stopEvent]
  );

  useEffect(() => {
    const div = dropRef.current;
    if (div) {
      div.addEventListener('drop', handleDrop);
      div.addEventListener('dragover', handleDragOver);
      div.addEventListener('dragenter', handleDragEnter);
      div.addEventListener('dragleave', handleDragLeave);
    }

    return () => {
      if (div) {
        div.removeEventListener('drop', handleDrop);
        div.removeEventListener('dragover', handleDragOver);
        div.removeEventListener('dragenter', handleDragEnter);
        div.removeEventListener('dragleave', handleDragLeave);
      }
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  useEffect(() => {
    if (filesRejected.length) {
      setIsError({
        status: true,
        message: `${filesRejected.length} image${filesRejected.length > 1 ? 's' : ''} exceeded ${convertToMb(MAX_IMAGE_SIZE)} limit: \n${filesRejected.join(',\n')}`,
      });
    }
  }, [filesRejected]);

  return {
    dropRef,
    inputRef,
    isError,
    isDraggingOver,
    handleClick,
    handleUpload,
  };
};
