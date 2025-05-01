import { useAction } from 'next-safe-action/hooks';
import { type ChangeEvent, type DragEvent, useState } from 'react';
import { toast } from 'sonner';

import { MAX_IMAGE_SIZE } from '@/config/constants';
import { convertToMb } from '@/lib/utils';

import { singleUploadAction } from '../actions/image-upload';

type UseSingleImageUploadProps = {
  onUploadComplete: (url: string) => void;
};

type UseImageUploadReturn = {
  preview: string | null;
  isUploading: boolean;
  uploadComplete: boolean;
  draggingOver: boolean;
  error: string | null;
  handleUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDrop: (e: DragEvent<HTMLDivElement>) => Promise<void>;
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
};

export const useSingleImageUpload = ({
  onUploadComplete,
}: UseSingleImageUploadProps): UseImageUploadReturn => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { execute, isPending } = useAction(singleUploadAction, {
    onError: (error) => {
      console.error('Error uploading file: ', error);
      setError('Failed to upload image. Please try again.');
      toast.error('Failed to upload image. Please try again.');
    },
    onSuccess: (result) => {
      if (result.data) {
        onUploadComplete(result.data.url);
        setUploadComplete(true);
      }
    },
  });

  const handleFileProcess = async (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File size exceeds ${convertToMb(file.size)} limit`);
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    execute(formData);
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files?.[0];
    if (!file) return;
    await handleFileProcess(file);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await handleFileProcess(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(true);
  };

  return {
    preview,
    isUploading: isPending,
    uploadComplete,
    draggingOver,
    error,
    handleUpload,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
  };
};
