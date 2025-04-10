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
        className="mx-auto bg-white flex flex-col rounded-b-lg shadow-lg p-6 h-96"
        onSubmit={form.handleSubmit(onSubmitDetails)}
      >
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName" className="flex">
                    First Name <span className="text-red-500 ml-1">*</span>
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
                  <FormLabel htmlFor="lastName" className="flex">
                    Last Name <span className="text-red-500 ml-1">*</span>
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
                  <FormLabel htmlFor="email" className="flex">
                    Email Address <span className="text-red-500 ml-1">*</span>
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
                  <FormLabel htmlFor="mobile" className="flex">
                    Mobile Number <span className="text-red-500 ml-1">*</span>
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
                <FormItem className="flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      className="cursor-pointer m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex"
                  >
                    I agree to the terms and conditions <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormMessage />
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
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
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
