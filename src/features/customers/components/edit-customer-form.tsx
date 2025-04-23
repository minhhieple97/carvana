'use client';

import { formatCustomerStatus } from '@/lib/utils';
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
import { EditCustomerSchema, EditCustomerType } from '@/schemas';
import { useUpdateCustomer } from '../hooks';

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
      <form onChange={form.handleSubmit(onChangeHandler)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field: { ref, ...rest } }) => (
            <FormItem>
              <FormLabel htmlFor="status">Customer Status</FormLabel>
              <FormControl>
                <Select
                  options={Object.values(CustomerStatus).map((value) => ({
                    label: formatCustomerStatus(value),
                    value,
                  }))}
                  noDefault={false}
                  selectClassName="bg-primary-800 border-transparent text-muted/75"
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
