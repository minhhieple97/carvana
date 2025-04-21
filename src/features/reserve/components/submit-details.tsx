'use client';

import { Loader2 } from 'lucide-react';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { type MultiStepFormComponentProps } from '@/config/types';

import { useSubmitDetails } from '../hooks';

export const SubmitDetails = (props: MultiStepFormComponentProps) => {
  const { params, searchParams } = props;
  const { form, isPending, prevStep, onSubmitDetails } = useSubmitDetails(params, searchParams);

  return (
    <Form {...form}>
      <form
        className="mx-auto bg-card dark:bg-card text-card-foreground dark:text-card-foreground flex flex-col rounded-b-lg shadow-lg p-6 h-96 border border-border dark:border-input/50"
        onSubmit={form.handleSubmit(onSubmitDetails)}
      >
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="firstName"
                    className="flex text-foreground dark:text-foreground/90"
                  >
                    First Name <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="lastName"
                    className="flex text-foreground dark:text-foreground/90"
                  >
                    Last Name <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="email"
                    className="flex text-foreground dark:text-foreground/90"
                  >
                    Email Address <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="mobile"
                    className="flex text-foreground dark:text-foreground/90"
                  >
                    Mobile Number <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-muted/30 dark:bg-muted/10">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      className="h-4 w-4 border-input rounded"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel
                      htmlFor="terms"
                      className="text-sm font-medium leading-none cursor-pointer text-foreground dark:text-foreground/90"
                    >
                      I agree to the terms and conditions{' '}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-x-4">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            variant="secondary"
          >
            Previous Step
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null} Submit
            Details
          </Button>
        </div>
      </form>
    </Form>
  );
};
