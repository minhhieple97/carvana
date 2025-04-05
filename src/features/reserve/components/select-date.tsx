'use client';

import { type MultiStepFormComponentProps } from '@/config/types';
import { generateDateOptions, generateTimeOptions } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
} from '@/components/ui';

import { useSelectDate } from '../hooks';

export const SelectDate = (props: MultiStepFormComponentProps) => {
  const { searchParams, classified } = props;
  const { form, isPending, isPrevPending, prevStep, onSelectDate } = useSelectDate(
    searchParams,
    classified
  );

  return (
    <Form {...form}>
      <form
        className="mx-auto bg-white flex flex-col rounded-b-lg shadow-lg p-6 h-96"
        onSubmit={form.handleSubmit(onSelectDate)}
      >
        <div className="space-y-6 flex-1">
          <FormField
            control={form.control}
            name="handoverDate"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverDate">Select a Date</FormLabel>
                <FormControl>
                  <Select options={generateDateOptions()} placeholder="Select a date" {...rest} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handoverTime"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverTime">Select a Time</FormLabel>
                <FormControl>
                  <Select options={generateTimeOptions()} placeholder="Select a time" {...rest} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isPrevPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPrevPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null} Previous
            Step
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null} Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
