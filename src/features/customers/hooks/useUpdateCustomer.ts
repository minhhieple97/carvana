import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { type EditCustomerType } from '@/schemas';

import { updateCustomerAction } from '../actions';

export const useUpdateCustomer = () => {
  const { execute, isPending } = useAction(updateCustomerAction, {
    onSuccess: () => {
      toast.success('Customer Updated');
    },
    onError: (result) => {
      toast.error('Error Updating Customer', {
        description: result.error.serverError,
      });
    },
  });

  return {
    updateCustomer: (data: EditCustomerType & { id: number }) => execute(data),
    isUpdating: isPending,
  };
};
