'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useNewsletterForm } from './useNewsletterForm';

const SubscribeButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full uppercase font-bold">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin mr-2" aria-hidden="true" />
          Subscribing...
        </>
      ) : (
        'Subscribe Now'
      )}
    </Button>
  );
};

export const NewsletterForm = () => {
  const { form, handleSubmit, formAction, formRef } = useNewsletterForm();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary">Subscribe to our inventory updates</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Enter your details to receive new stock updates
      </p>
      <Form {...form}>
        <form ref={formRef} action={formAction} className="space-y-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" className="bg-white" {...field} />
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
                  <FormControl>
                    <Input placeholder="Last Name" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" className="bg-white w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubscribeButton />
        </form>
      </Form>
    </div>
  );
};
