'use client';

import { Clock, Loader2 } from 'lucide-react';
import { format, parse } from 'date-fns';

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { type MultiStepFormComponentProps } from '@/config/types';

import { useSelectDate } from '../hooks';

export const SelectDate = (props: MultiStepFormComponentProps) => {
  const { searchParams, classified } = props;
  const { form, isPending, isPrevPending, prevStep, onSelectDate, timeOptions, handleDateSelect } =
    useSelectDate(searchParams, classified);

  const selectedDate = form.watch('handoverDate');

  return (
    <Form {...form}>
      <form
        className="mx-auto bg-card flex flex-col rounded-lg shadow-lg p-6 text-card-foreground border border-border dark:border-input/50"
        onSubmit={form.handleSubmit(onSelectDate)}
      >
        <h2 className="text-xl font-medium mb-6 text-center">Schedule Your Handover</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Calendar */}
          <div className="flex-1">
            <FormField
              control={form.control}
              name="handoverDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">Select Date</FormLabel>
                  <div className="border rounded-md p-3 bg-background shadow-sm">
                    <Calendar
                      mode="single"
                      selected={
                        field.value ? parse(field.value, 'dd MMM yyyy', new Date()) : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          const formattedDate = format(date, 'dd MMM yyyy');
                          field.onChange(formattedDate);
                          handleDateSelect(formattedDate);
                        }
                      }}
                      disabled={(date) => {
                        return date < new Date(new Date().setHours(0, 0, 0, 0));
                      }}
                      initialFocus
                      className="rounded-md overflow-hidden w-full"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right side - Time selection */}
          <div className="flex-1 flex flex-col">
            <FormField
              control={form.control}
              name="handoverTime"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">Select Time</FormLabel>
                  <div className="border rounded-md p-4 flex-1 bg-background shadow-sm">
                    {!selectedDate ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Please select a date first
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="font-medium text-sm text-center">
                          Selected Date: <span className="text-primary">{selectedDate}</span>
                        </div>
                        <div className="relative mt-2">
                          <FormControl>
                            <Select
                              options={timeOptions}
                              placeholder="Select a time"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              className="w-full h-11"
                            />
                          </FormControl>
                          <Clock className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="text-sm text-muted-foreground flex gap-2 items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Available Time Slots</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Please select your preferred time for the vehicle handover.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 mt-8">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isPrevPending}
            className="uppercase font-semibold flex gap-x-3 text-sm bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all h-11"
            variant="secondary"
          >
            {isPrevPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null}
            Previous Step
          </Button>
          <Button
            type="submit"
            disabled={isPending || !selectedDate || !form.watch('handoverTime')}
            className="uppercase font-semibold flex gap-x-3 text-sm bg-primary hover:bg-primary/90 transition-all h-11"
          >
            {isPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
