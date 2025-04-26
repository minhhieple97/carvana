'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Customer, CustomerStatus } from '@prisma/client';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
} from '@/components/ui';
import { formatCustomerStatus } from '@/lib/utils';
import { EditCustomerSchema } from '@/schemas';

import { useUpdateCustomer } from '../hooks';

import type { EditCustomerType } from '@/schemas';

type EditCustomerFormProps = {
  customer: Customer;
};

export const EditCustomerForm = ({ customer }: EditCustomerFormProps) => {
  const { updateCustomer } = useUpdateCustomer();

  const form = useForm<EditCustomerType>({
    resolver: zodResolver(EditCustomerSchema),
    defaultValues: {
      status: customer.status,
    },
  });

  const onChangeHandler: SubmitHandler<EditCustomerType> = (data) => {
    updateCustomer({
      id: customer.id,
      status: data.status,
    });
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChangeHandler)} className="w-[240px]">
        <FormField
          control={form.control}
          name="status"
          render={({ field: { ref, ...rest } }) => (
            <FormItem>
              <FormLabel className="text-foreground mb-2">Status</FormLabel>
              <FormControl>
                <Select
                  options={Object.values(CustomerStatus).map((value) => ({
                    label: formatCustomerStatus(value),
                    value,
                  }))}
                  noDefault={false}
                  selectClassName="bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
