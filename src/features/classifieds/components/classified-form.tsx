'use client';

import { Loader2 } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  Button,
  Select,
} from '@/components';
import { MAX_IMAGES } from '@/config/constants';

import { ClassifiedFormFields } from './classified-form-fields';
import { MultiImageUploader } from './multi-image-uploader';
import { useClassifiedForm } from '../hooks/useClassifiedForm';

import type { ClassifiedWithImages } from '@/features/classifieds';

type ClassifiedFormProps = {
  classified: ClassifiedWithImages;
};

export const ClassifiedForm = ({ classified }: ClassifiedFormProps) => {
  const { form, handleSubmit, isPending, statusOptions } = useClassifiedForm(classified);
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-foreground">Upload Vehicle</h1>
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClassifiedFormFields />
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field: { name, onChange } }) => (
                <FormItem>
                  <FormLabel className="text-form-label-color" htmlFor="images">
                    Images (up to {MAX_IMAGES})
                  </FormLabel>
                  <FormControl>
                    <MultiImageUploader name={name} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field: { ref, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <Select options={statusOptions} noDefault={false} {...rest} label="Status" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="w-full flex gap-x-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-form-radius transition-colors duration-200"
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
