'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { ImageUploader } from './single-image-uploader';
import { useCreateClassifiedDialog } from '../hooks/useCreateClassifiedDialog';

export const CreateClassifiedDialog = () => {
  const {
    isModalOpen,
    handleOpenChange,
    isUploading,
    isCreating,
    messages,
    imageForm,
    createForm,
    handleImageUpload,
    onImageSubmit,
    onCreateSubmit,
  } = useCreateClassifiedDialog();

  const isLoading = isUploading || isCreating;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="ml-4" size="sm">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('max-w-6xl bg-white')}>
        <DialogHeader>
          <DialogTitle>Create New Classified</DialogTitle>
        </DialogHeader>
        {messages.length ? (
          <Form {...createForm}>
            <form className="space-y-4" onSubmit={onCreateSubmit}>
              {messages.map((message) => (
                <div className="w-full" key={message.id}>
                  {typeof message.display === 'string' ? <p>{message.display}</p> : message.display}
                </div>
              ))}
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading || !createForm.formState.isValid}
                  type="submit"
                  className="flex items-center gap-x-2"
                >
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                  {isUploading ? 'Processing...' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...imageForm}>
            <form className="space-y-4" onSubmit={onImageSubmit}>
              <ImageUploader onUploadComplete={handleImageUpload} />
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUploading || !imageForm.formState.isValid}
                  type="submit"
                  className="flex items-center gap-x-2"
                >
                  {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
                  Generate Details
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
