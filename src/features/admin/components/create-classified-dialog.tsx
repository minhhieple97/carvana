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

import { SingleImageUploader } from './single-image-uploader';
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
        <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className={cn(
          'max-w-6xl',
          'bg-background dark:bg-card',
          'text-foreground dark:text-card-foreground',
          'border border-border dark:border-input',
          'shadow-lg'
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-card-foreground">
            Create New Classified
          </DialogTitle>
        </DialogHeader>
        {messages.length ? (
          <Form {...createForm}>
            <form className="space-y-4" onSubmit={onCreateSubmit}>
              {messages.map((message) => (
                <div
                  className="w-full text-foreground/90 dark:text-card-foreground/90"
                  key={message.id}
                >
                  {typeof message.display === 'string' ? (
                    <p className="text-foreground/90 dark:text-card-foreground/90">
                      {message.display}
                    </p>
                  ) : (
                    message.display
                  )}
                </div>
              ))}
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={isLoading}
                  className="border-border dark:border-input hover:bg-secondary/80 dark:hover:bg-secondary/20"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading || !createForm.formState.isValid}
                  type="submit"
                  className={cn(
                    'flex items-center gap-x-2',
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90 dark:hover:bg-primary/80',
                    'disabled:bg-muted disabled:text-muted-foreground'
                  )}
                >
                  {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                  {isUploading ? 'Processing...' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...imageForm}>
            <form className="space-y-4" onSubmit={onImageSubmit}>
              <SingleImageUploader onUploadComplete={handleImageUpload} />
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={isUploading}
                  className="border-border dark:border-input hover:bg-secondary/80 dark:hover:bg-secondary/20"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUploading || !imageForm.formState.isValid}
                  type="submit"
                  className={cn(
                    'flex items-center gap-x-2',
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90 dark:hover:bg-primary/80',
                    'disabled:bg-muted disabled:text-muted-foreground'
                  )}
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
